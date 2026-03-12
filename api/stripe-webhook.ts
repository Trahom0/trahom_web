import crypto from 'crypto';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const DEFAULT_TOLERANCE_SECONDS = 5 * 60;

const readRawBody = (req: any) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

const parseStripeSignature = (signatureHeader: string) => {
  const items = signatureHeader.split(',').map((item) => item.trim());
  const timestampItem = items.find((item) => item.startsWith('t='));
  const signatures = items.filter((item) => item.startsWith('v1=')).map((item) => item.slice(3));
  const timestamp = timestampItem ? Number(timestampItem.slice(2)) : NaN;

  return { timestamp, signatures };
};

const isValidSignature = (payload: string, secret: string, signatureHeader: string) => {
  const { timestamp, signatures } = parseStripeSignature(signatureHeader);
  if (!timestamp || !signatures.length) {
    return false;
  }

  const age = Math.abs(Date.now() / 1000 - timestamp);
  if (age > DEFAULT_TOLERANCE_SECONDS) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expected = crypto.createHmac('sha256', secret).update(signedPayload).digest('hex');
  return signatures.includes(expected);
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    res.status(500).send('Stripe webhook secret is missing');
    return;
  }

  const signatureHeader = req.headers['stripe-signature'];
  if (!signatureHeader || Array.isArray(signatureHeader)) {
    res.status(400).send('Missing Stripe signature');
    return;
  }

  try {
    const rawBody = await readRawBody(req);
    const payload = rawBody.toString('utf8');

    if (!isValidSignature(payload, STRIPE_WEBHOOK_SECRET, signatureHeader)) {
      res.status(400).send('Invalid signature');
      return;
    }

    const event = JSON.parse(payload);

    switch (event.type) {
      case 'checkout.session.completed':
      case 'invoice.payment_succeeded':
      case 'customer.subscription.deleted':
        console.log(`Stripe event received: ${event.type}`);
        break;
      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook error';
    res.status(400).send(message);
  }
}
