// Orphan status from Trahom Core (Firebase): when the team records a sponsorship in Trahom Core, a Cloud Function
// calls this endpoint and the orphan disappears from the website's sponsorship page (within about a minute,
// the cache time of /api/orphans). When a sponsorship ends, the same call with "available" shows it again.
// It writes to the same list as "mark as sponsored" in the website admin, so both keep working together.
//
// Request (server to server only, never from the app on a phone):
//   POST https://trahom.org/api/orphan-status
//   Content-Type: application/json
//   X-Trahom-Timestamp: <Unix time in seconds>
//   X-Trahom-Signature: sha256=<hex HMAC-SHA256 of `${timestamp}.${rawBody}` with TRAHOM_WEBSITE_API_SECRET>
//   Body: {"code":"<orphan code>","status":"sponsored" | "available"}
//
// A request older or newer than 5 minutes is refused. Repeating the same call is harmless.
// Only the orphan's code is stored, never names or ID numbers.
//
// Required environment variable (Vercel → Settings → Environment Variables, Production):
//   TRAHOM_WEBSITE_API_SECRET  the same random value as in Firebase Secret Manager (at least 32 characters).
import { createHmac, timingSafeEqual } from 'crypto';
import { list, put } from '@vercel/blob';

const SECRET = process.env.TRAHOM_WEBSITE_API_SECRET ?? '';
const SPONSORED_FILE = 'orphans/sponsored.json';
const MAX_BODY_BYTES = 2_000;
const MAX_SKEW_SECONDS = 300;

type SponsoredEntry = { code: string; at: string; by: string };

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

const header = (req: any, name: string) => {
  const value = req.headers?.[name];
  return String(Array.isArray(value) ? value[0] : value ?? '').trim();
};

const validSignature = (timestamp: string, rawBody: Buffer, signature: string) => {
  const match = /^sha256=([a-f0-9]{64})$/i.exec(signature);
  if (!match) {
    return false;
  }
  const expected = createHmac('sha256', SECRET).update(`${timestamp}.`).update(rawBody).digest();
  const given = Buffer.from(match[1], 'hex');
  return given.length === expected.length && timingSafeEqual(given, expected);
};

const readSponsored = async (): Promise<SponsoredEntry[]> => {
  const page: any = await list({ prefix: SPONSORED_FILE, limit: 10 });
  const file = page.blobs.find((item: { pathname: string }) => item.pathname === SPONSORED_FILE);
  if (!file) {
    return [];
  }
  // The file is overwritten in place, so skip the CDN copy to always read the latest list.
  const response = await fetch(`${file.url}?v=${Date.now()}`, { cache: 'no-store', signal: AbortSignal.timeout(8_000) });
  if (!response.ok) {
    throw new Error(`Sponsored list read failed with ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data?.entries) ? data.entries : [];
};

const writeSponsored = async (entries: SponsoredEntry[]) => {
  await put(SPONSORED_FILE, JSON.stringify({ updatedAt: new Date().toISOString(), codes: entries.map((entry) => entry.code), entries }), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60
  });
};

const audit = async (action: string, code: string) => {
  const entry = { at: new Date().toISOString(), email: 'trahom-core', action, postId: '', detail: code };
  await put(`audit/${entry.at.replace(/[:.]/g, '-')}.json`, JSON.stringify(entry), {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json'
  }).catch((error) => console.error('Audit write failed', error));
};

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'method-not-allowed' });
    return;
  }
  if (SECRET.length < 32) {
    res.status(503).json({ error: 'not-configured' });
    return;
  }

  let rawBody: Buffer;
  try {
    rawBody = await readRawBody(req);
  } catch {
    res.status(413).json({ error: 'too-large' });
    return;
  }

  const timestamp = header(req, 'x-trahom-timestamp');
  if (!/^\d{9,11}$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > MAX_SKEW_SECONDS) {
    res.status(401).json({ error: 'bad-timestamp' });
    return;
  }
  if (!validSignature(timestamp, rawBody, header(req, 'x-trahom-signature'))) {
    res.status(401).json({ error: 'bad-signature' });
    return;
  }

  let body: any;
  try {
    body = JSON.parse(rawBody.toString('utf8'));
  } catch {
    res.status(400).json({ error: 'invalid-json' });
    return;
  }
  const code = typeof body?.code === 'string' ? body.code.trim() : '';
  const status = body?.status;
  if (!code || code.length > 40 || /[\u0000-\u001f]/.test(code) || (status !== 'sponsored' && status !== 'available')) {
    res.status(400).json({ error: 'invalid-fields' });
    return;
  }

  try {
    const entries = await readSponsored();
    const exists = entries.some((entry) => entry.code === code);
    let changed = false;
    if (status === 'sponsored' && !exists) {
      entries.unshift({ code, at: new Date().toISOString(), by: 'trahom-core' });
      await writeSponsored(entries);
      changed = true;
    } else if (status === 'available' && exists) {
      await writeSponsored(entries.filter((entry) => entry.code !== code));
      changed = true;
    }
    if (changed) {
      await audit(status === 'sponsored' ? 'orphan:sponsored' : 'orphan:available-again', code);
    }
    res.status(200).json({ ok: true, code, status, changed });
  } catch (error) {
    console.error('Orphan status update failed', error);
    res.status(500).json({ error: 'update-failed' });
  }
}
