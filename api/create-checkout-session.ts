const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const MIN_AMOUNT_CENTS = 50;

const readRequestBody = async (req: any) => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  return new Promise<any>((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: string) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
};

const getOrigin = (req: any) => {
  if (req.headers?.origin) {
    return req.headers.origin;
  }
  const proto = req.headers?.['x-forwarded-proto'] ?? 'https';
  const host = req.headers?.['x-forwarded-host'] ?? req.headers?.host;
  if (!host) {
    return '';
  }
  return `${proto}://${host}`;
};

const toCents = (amount: number) => Math.round(amount * 100);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!STRIPE_SECRET_KEY) {
    res.status(500).json({ error: 'Stripe secret key is missing' });
    return;
  }

  try {
    const body = await readRequestBody(req);
    const amount = Number(body.amount);
    const frequency = body.frequency === 'monthly' ? 'monthly' : 'one-time';
    const cause = typeof body.cause === 'string' ? body.cause : 'where-needed';
    const causeLabel = typeof body.causeLabel === 'string' ? body.causeLabel : 'Where Most Needed';
    const campaign = typeof body.campaign === 'string' ? body.campaign : '';
    const donor = typeof body.donor === 'object' && body.donor ? body.donor : {};

    if (!Number.isFinite(amount) || amount <= 0) {
      res.status(400).json({ error: 'Invalid donation amount' });
      return;
    }

    const amountCents = toCents(amount);
    if (amountCents < MIN_AMOUNT_CENTS) {
      res.status(400).json({ error: 'Donation amount is too small' });
      return;
    }

    const origin = getOrigin(req);
    if (!origin) {
      res.status(400).json({ error: 'Missing request origin' });
      return;
    }

    const params = new URLSearchParams();
    params.append('mode', frequency === 'monthly' ? 'subscription' : 'payment');
    params.append('success_url', `${origin}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`);
    params.append('cancel_url', `${origin}/donate?status=cancel`);

    if (typeof donor.email === 'string' && donor.email) {
      params.append('customer_email', donor.email);
    }

    const itemName = `Donation - ${causeLabel}`;
    params.append('line_items[0][quantity]', '1');
    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][unit_amount]', String(amountCents));
    params.append('line_items[0][price_data][product_data][name]', itemName);
    params.append('line_items[0][price_data][product_data][metadata][cause]', cause);
    if (campaign) {
      params.append('line_items[0][price_data][product_data][metadata][campaign]', campaign);
    }

    if (frequency === 'monthly') {
      params.append('line_items[0][price_data][recurring][interval]', 'month');
      params.append('subscription_data[metadata][cause]', cause);
      params.append('subscription_data[metadata][frequency]', frequency);
      if (campaign) {
        params.append('subscription_data[metadata][campaign]', campaign);
      }
    } else {
      params.append('invoice_creation[enabled]', 'true');
      params.append('payment_intent_data[metadata][cause]', cause);
      params.append('payment_intent_data[metadata][frequency]', frequency);
      if (campaign) {
        params.append('payment_intent_data[metadata][campaign]', campaign);
      }
    }

    if (typeof donor.firstName === 'string' || typeof donor.lastName === 'string') {
      const fullName = `${donor.firstName ?? ''} ${donor.lastName ?? ''}`.trim();
      if (fullName) {
        params.append('metadata[donor_name]', fullName);
      }
    }
    if (typeof donor.phone === 'string' && donor.phone) {
      params.append('metadata[donor_phone]', donor.phone);
    }
    if (typeof donor.country === 'string' && donor.country) {
      params.append('metadata[donor_country]', donor.country);
    }
    params.append('metadata[cause]', cause);
    params.append('metadata[frequency]', frequency);
    if (campaign) {
      params.append('metadata[campaign]', campaign);
    }

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      res.status(stripeResponse.status).json({ error: session?.error?.message ?? 'Stripe error' });
      return;
    }

    res.status(200).json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create checkout session';
    res.status(500).json({ error: message });
  }
}
