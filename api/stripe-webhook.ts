import crypto from 'crypto';

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const DEFAULT_TOLERANCE_SECONDS = 5 * 60;

const MAX_BODY_BYTES = 1_000_000;

const readRawBody = (req: any) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer | string) => {
      const buffer = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
      size += buffer.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Payload too large'));
        req.destroy?.();
        return;
      }
      chunks.push(buffer);
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
  const expectedBuffer = Buffer.from(expected, 'hex');
  // Constant-time comparison so the secret cannot be guessed from response timing.
  return signatures.some((signature) => {
    const candidate = Buffer.from(signature, 'hex');
    return candidate.length === expectedBuffer.length && crypto.timingSafeEqual(candidate, expectedBuffer);
  });
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    res.status(500).send('Webhook not configured');
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
    console.error('Stripe webhook failed', error);
    res.status(400).send('Webhook error');
  }
}
