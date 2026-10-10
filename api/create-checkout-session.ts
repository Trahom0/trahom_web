const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SITE_URL = process.env.SITE_URL;
const MIN_AMOUNT_CENTS = 100; // $1
const MAX_AMOUNT_CENTS = 2_500_000; // $25,000

// Only these causes can be donated to; labels are decided here, never by the browser.
const CAUSE_LABELS: Record<string, string> = {
  'orphan-sponsorship': 'Orphan Sponsorship',
  water: 'Clean Water',
  'winter-campaign': 'Winter Campaign',
  'food-security': 'Food Security Program',
  'where-needed': 'Where Most Needed'
};

const ALLOWED_HOSTS = ['trahom.org', 'www.trahom.org'];

const cleanText = (value: unknown, max = 100) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, '').trim().slice(0, max) : '';

const MAX_BODY_BYTES = 20_000;

// Returns the parsed JSON body, or null when it is missing, malformed or too large.
const readJsonBody = async (req: any): Promise<any | null> => {
  let parsed: unknown;
  try {
    parsed = req.body;
  } catch {
    return null;
  }
  if (parsed && typeof parsed === 'object') {
    return parsed;
  }
  if (typeof parsed === 'string') {
    try {
      return parsed.length > MAX_BODY_BYTES ? null : JSON.parse(parsed);
    } catch {
      return null;
    }
  }
  if (!req.readable) {
    return {};
  }
  return new Promise((resolve) => {
    let body = '';
    let done = false;
    const finish = (value: any) => {
      if (!done) {
        done = true;
        resolve(value);
      }
    };
    req.on('data', (chunk: Buffer | string) => {
      body += chunk;
      if (body.length > MAX_BODY_BYTES) {
        finish(null);
      }
    });
    req.on('end', () => {
      if (!body) {
        finish({});
        return;
      }
      try {
        finish(JSON.parse(body));
      } catch {
        finish(null);
      }
    });
    req.on('error', () => finish(null));
  });
};

// Where Stripe sends the donor back to. Never trust the caller's Origin header blindly:
// use SITE_URL in production, otherwise only our own domains or our Vercel previews.
const getOrigin = (req: any) => {
  if (SITE_URL) {
    return SITE_URL.replace(/\/+$/, '');
  }
  const host = String(req.headers?.['x-forwarded-host'] ?? req.headers?.host ?? '').toLowerCase();
  const isAllowed = ALLOWED_HOSTS.includes(host) || /^trahom-web(-[a-z0-9-]+)?\.vercel\.app$/.test(host);
  return isAllowed ? `https://${host}` : '';
};

const toCents = (amount: number) => Math.round(amount * 100);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY is not set');
    res.status(500).json({ error: 'Unable to start the payment. Please try again.' });
    return;
  }

  try {
    const body = await readJsonBody(req);
    if (!body) {
      res.status(400).json({ error: 'Invalid request' });
      return;
    }
    const amount = Number(body.amount);
    const frequency = body.frequency === 'monthly' ? 'monthly' : 'one-time';
    const cause = typeof body.cause === 'string' && CAUSE_LABELS[body.cause] ? body.cause : 'where-needed';
    const causeLabel = CAUSE_LABELS[cause];
    const campaign = typeof body.campaign === 'string' && /^[a-z0-9-]{1,40}$/.test(body.campaign) ? body.campaign : '';
    const rawDonor = typeof body.donor === 'object' && body.donor ? body.donor : {};
    const donor = {
      firstName: cleanText(rawDonor.firstName),
      lastName: cleanText(rawDonor.lastName),
      email: cleanText(rawDonor.email, 254),
      phone: cleanText(rawDonor.phone, 40),
      country: cleanText(rawDonor.country, 60)
    };

    if (!Number.isFinite(amount) || amount <= 0) {
      res.status(400).json({ error: 'Invalid donation amount' });
      return;
    }

    const amountCents = toCents(amount);
    if (amountCents < MIN_AMOUNT_CENTS) {
      res.status(400).json({ error: 'Donation amount is too small' });
      return;
    }
    if (amountCents > MAX_AMOUNT_CENTS) {
      res.status(400).json({ error: 'For donations above $25,000 please contact info@trahom.org' });
      return;
    }

    const origin = getOrigin(req);
    if (!origin) {
      res.status(400).json({ error: 'Missing request origin' });
      return;
    }

    const params = new URLSearchParams();
    params.append('mode', frequency === 'monthly' ? 'subscription' : 'payment');
    // Send the donor back to the donate page in the language they were using.
    const languagePrefix = ({ AR: '/ar', TR: '/tr' } as Record<string, string>)[cleanText(body.language, 2).toUpperCase()] ?? '';
    params.append('success_url', `${origin}${languagePrefix}/donate?status=success&session_id={CHECKOUT_SESSION_ID}`);
    const cancelQuery = new URLSearchParams({ status: 'cancel', cause });
    if (campaign) {
      cancelQuery.set('campaign', campaign);
    }
    params.append('cancel_url', `${origin}${languagePrefix}/donate?${cancelQuery.toString()}`);

    if (donor.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donor.email)) {
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

    const fullName = `${donor.firstName} ${donor.lastName}`.trim();
    if (fullName) {
      params.append('metadata[donor_name]', fullName);
    }
    if (donor.phone) {
      params.append('metadata[donor_phone]', donor.phone);
    }
    if (donor.country) {
      params.append('metadata[donor_country]', donor.country);
    }
    params.append('metadata[cause]', cause);
    params.append('metadata[frequency]', frequency);
    if (campaign) {
      params.append('metadata[campaign]', campaign);
    }

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      signal: AbortSignal.timeout(15_000),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const session = await stripeResponse.json();

    if (!stripeResponse.ok) {
      console.error('Stripe checkout error', session?.error);
      res.status(502).json({ error: 'Unable to start the payment. Please try again.' });
      return;
    }

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout session failed', error);
    res.status(500).json({ error: 'Unable to start the payment. Please try again.' });
  }
}
