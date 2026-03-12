const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const RESEND_TO_EMAIL = process.env.RESEND_TO_EMAIL;

const MAX_MESSAGE_LENGTH = 5000;

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

const sanitize = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

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

  try {
    const body = await readRequestBody(req);
    const firstName = sanitize(body.firstName);
    const lastName = sanitize(body.lastName);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const subject = sanitize(body.subject);
    const subjectLabel = sanitize(body.subjectLabel);
    const message = sanitize(body.message);
    const language = sanitize(body.language);
    const website = sanitize(body.website);

    if (website) {
      res.status(200).json({ ok: true });
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
    const origin = getOrigin(req);

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
      res.status(500).json({ error: responsePayload?.message ?? 'Unable to send message' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send message';
    res.status(500).json({ error: message });
  }
}
