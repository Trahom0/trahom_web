// Newsletter and app-launch sign-ups: emails the subscriber's address to the team inbox (RESEND_TO_EMAIL)
// so it can be added to the mailing list. Uses the same Resend settings as the contact form.
//
// App-launch sign-ups ("tell me when the Trahom app is out") are also kept in the Blob store so the website
// admin can email everyone the store links in one go on launch day. Each address is stored encrypted,
// in a file whose name is a keyed hash of the address: nothing in the store is readable or findable without
// the store's secret token, and the list is only shown inside /admin.
import { createCipheriv, createHash, createHmac, randomBytes } from 'crypto';
import { put } from '@vercel/blob';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL;

const ALLOWED_HOSTS = ['trahom.org', 'www.trahom.org'];
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

const isFromOurSite = (req: any) => {
  const source = String(req.headers?.origin ?? req.headers?.referer ?? '');
  try {
    const host = new URL(source).hostname.toLowerCase();
    if (ALLOWED_HOSTS.includes(host)) {
      return true;
    }
    // Preview links and local testing are accepted only outside the live site.
    if (process.env.VERCEL_ENV === 'production') {
      return false;
    }
    return /^trahom-web(-[a-z0-9-]+)?\.vercel\.app$/.test(host) || host === 'localhost';
  } catch {
    return false;
  }
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (recentSubmissions.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  const limited = recent.length >= RATE_LIMIT;
  if (!limited) {
    recent.push(now);
  }
  recentSubmissions.set(ip, recent);
  if (recentSubmissions.size > 5000) {
    recentSubmissions.clear();
  }
  return limited;
};

const readRequestBody = async (req: any) => {
  let parsed: unknown;
  try {
    parsed = req.body;
  } catch {
    return null;
  }
  if (parsed && typeof parsed === 'object') {
    return parsed;
  }
  if (!req.readable) {
    return {};
  }
  return new Promise<any>((resolve) => {
    let body = '';
    let done = false;
    const finish = (value: any) => {
      if (!done) {
        done = true;
        resolve(value);
      }
    };
    req.on('data', (chunk: string) => {
      body += chunk;
      if (body.length > 10_000) {
        finish(null);
      }
    });
    req.on('end', () => {
      try {
        finish(body ? JSON.parse(body) : {});
      } catch {
        finish(null);
      }
    });
    req.on('error', () => finish(null));
  });
};

// Same scheme as api/admin.ts (which reads these files). The key comes from the store's own token, so it
// changes only if the store itself is replaced.
const signupSecret = () => createHash('sha256').update(`trahom-app-signups:${process.env.BLOB_READ_WRITE_TOKEN ?? ''}`).digest();
const signupId = (email: string) => createHmac('sha256', signupSecret()).update(`id:${email}`).digest('hex').slice(0, 32);

const saveAppSignup = async (email: string, language: string) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Blob store is not connected');
  }
  const normalized = email.toLowerCase();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', signupSecret(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify({ email: normalized, language, at: new Date().toISOString() }), 'utf8'), cipher.final()]);
  const record = { v: 1, iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64'), data: data.toString('base64') };
  // One file per address: signing up twice just replaces the file, so nobody is emailed twice.
  await put(`app-signups/${signupId(normalized)}.json`, JSON.stringify(record), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60
  });
};

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max) : '';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
    res.status(500).json({ error: 'Email service is not configured' });
    return;
  }
  if (!isFromOurSite(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const body = await readRequestBody(req);
  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Invalid request' });
    return;
  }
  const email = clean(body.email, 200);
  const language = clean(body.language, 5);
  // "Tell me when the app launches" sign-ups are sent with their own subject so they can be kept apart.
  const isAppSignup = clean(body.topic, 10) === 'app';

  // Honeypot field, or a form sent faster than a person can type: pretend it worked and drop it.
  const elapsedMs = Number(body.elapsedMs);
  if (clean(body.website, 200) || (Number.isFinite(elapsedMs) && elapsedMs >= 0 && elapsedMs < 2000)) {
    res.status(200).json({ ok: true });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }
  const ip = String(req.headers?.['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests' });
    return;
  }

  let saved = false;
  if (isAppSignup) {
    try {
      await saveAppSignup(email, language);
      saved = true;
    } catch (error) {
      console.error('App sign-up could not be saved', error);
    }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      signal: AbortSignal.timeout(10_000),
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: RESEND_TO_EMAIL.split(',').map((item) => item.trim()).filter(Boolean),
        subject: isAppSignup ? 'Trahom app launch sign-up' : 'Newsletter sign-up',
        reply_to: email,
        text: `${isAppSignup ? 'Asked to be told when the Trahom app is on Google Play / App Store' : 'New newsletter subscriber'}\nEmail: ${email}${language ? `\nLanguage: ${language}` : ''}`
      })
    });
    if (!response.ok) {
      console.error('Resend error', response.status);
      // The app list already has the address, so the sign-up still counts.
      if (saved) {
        res.status(200).json({ ok: true });
        return;
      }
      res.status(502).json({ error: 'Unable to subscribe' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Subscribe failed', error);
    if (saved) {
      res.status(200).json({ ok: true });
      return;
    }
    res.status(500).json({ error: 'Unable to subscribe' });
  }
}
