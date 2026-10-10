const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL;

const MAX_MESSAGE_LENGTH = 5000;
// A person needs at least a few seconds to fill the form; bots submit instantly.
const MIN_FILL_TIME_MS = 3000;
// Best-effort limit per visitor IP (kept in memory, so it resets when Vercel restarts the function).
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentSubmissions = new Map<string, number[]>();

const ALLOWED_HOSTS = ['trahom.org', 'www.trahom.org'];

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recent = (recentSubmissions.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    recentSubmissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentSubmissions.set(ip, recent);
  if (recentSubmissions.size > 5000) {
    recentSubmissions.clear();
  }
  return false;
};

const getClientIp = (req: any) =>
  String(req.headers?.['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';

// Only accept submissions sent from our own site (or its Vercel previews).
const isFromOurSite = (req: any) => {
  const source = String(req.headers?.origin ?? req.headers?.referer ?? '');
  try {
    const host = new URL(source).hostname.toLowerCase();
    return ALLOWED_HOSTS.includes(host) || /^trahom-[a-z0-9-]*\.vercel\.app$/.test(host) || host === 'localhost';
  } catch {
    return false;
  }
};

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

// Trims, removes control characters (which could break email headers) and caps the length.
const sanitize = (value: unknown, max = 200) =>
  typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').trim().slice(0, max) : '';
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const parseRecipients = (value: string) =>
  value
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

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

  try {
    const body = await readRequestBody(req);
    const firstName = oneLine(sanitize(body.firstName, 100));
    const lastName = oneLine(sanitize(body.lastName, 100));
    const email = oneLine(sanitize(body.email, 200));
    const phone = oneLine(sanitize(body.phone, 40));
    const subject = oneLine(sanitize(body.subject, 100));
    const subjectLabel = oneLine(sanitize(body.subjectLabel, 150));
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const language = oneLine(sanitize(body.language, 5));
    const website = sanitize(body.website);
    const startedAt = Number(body.startedAt);

    // Honeypot field or a form filled faster than a person can: pretend it worked and drop it.
    if (website || (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS)) {
      res.status(200).json({ ok: true });
      return;
    }

    if (isRateLimited(getClientIp(req))) {
      res.status(429).json({ error: 'Too many messages. Please try again later.' });
      return;
    }

    if (!firstName || !lastName || !email || !subject || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Invalid email address' });
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      res.status(400).json({ error: 'Message is too long' });
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const displaySubject = subjectLabel || subject;
    const origin = oneLine(sanitize(getOrigin(req), 200));

    const textContent = [
      'New contact form submission',
      `Name: ${fullName}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      `Subject: ${displaySubject}`,
      language ? `Language: ${language}` : null,
      origin ? `Source: ${origin}` : null,
      '',
      'Message:',
      message
    ]
      .filter(Boolean)
      .join('\n');

    const htmlContent = `
      <div>
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Subject:</strong> ${escapeHtml(displaySubject)}</p>
        ${language ? `<p><strong>Language:</strong> ${escapeHtml(language)}</p>` : ''}
        ${origin ? `<p><strong>Source:</strong> ${escapeHtml(origin)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      </div>
    `;

    const recipients = parseRecipients(RESEND_TO_EMAIL);
    if (!recipients.length) {
      res.status(500).json({ error: 'Recipient email is not configured' });
      return;
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: recipients,
        subject: `Contact form: ${displaySubject}`,
        reply_to: email,
        text: textContent,
        html: htmlContent
      })
    });

    const responsePayload = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      console.error('Resend error', resendResponse.status, responsePayload?.message);
      res.status(502).json({ error: 'Unable to send message' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Contact form failed', error);
    res.status(500).json({ error: 'Unable to send message' });
  }
}
