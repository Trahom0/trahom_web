// Website admin ("لوحة الموقع") — one function for every admin action, so the site stays within the
// function limits. Used by the page at /admin.
//
// Sign-in: the person types their email; if it is on the allow-list, a one-time sign-in link is emailed to
// them (valid 15 minutes, works once). Opening it sets a signed session cookie (valid 7 days). There are
// no passwords. To sign everyone out at once, change ADMIN_SECRET. Use a different ADMIN_SECRET and Blob
// store for Preview deployments than for Production.
//
// Roles:
//   ADMIN_EMAILS  — can publish, approve, hide and delete posts.
//   EDITOR_EMAILS — can write posts and send them for approval; an email is sent to the admins, and nothing
//                   an editor writes appears on the site until an admin approves it.
//
// Storage: Vercel Blob (BLOB_READ_WRITE_TOKEN is added automatically when a Blob store is connected).
//   posts/<id>-<random>.json   one file per post version (older versions are deleted after each save)
//   images/<random>.jpg        uploaded photos
//   feed/feed-<random>.json    the published posts the homepage reads, rebuilt after every change
//   audit/<time>-<random>.json who did what and when
//   used/<nonce>-<random>      marks sign-in links that were already used
//
// Required environment variables (Vercel → Settings → Environment Variables, Production):
//   ADMIN_SECRET   a long random string (at least 32 characters). Changing it signs everyone out.
//   ADMIN_EMAILS   comma-separated, e.g. info@trahom.org
//   EDITOR_EMAILS  optional, comma-separated
//   RESEND_API_KEY / RESEND_FROM_EMAIL — already set for the contact form; used for sign-in links and notices.
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { del, list, put } from '@vercel/blob';

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const SITE_HOSTS = ['trahom.org', 'www.trahom.org'];
const SESSION_COOKIE = 'th_admin';
const SESSION_DAYS = 7;
const LINK_MINUTES = 15;
const MAX_JSON_BYTES = 50_000;
const MAX_UPLOAD_BYTES = 4_000_000; // Vercel's request limit is 4.5 MB; the page shrinks photos before sending.
const MAX_IMAGE_BYTES = 2_500_000;
const MAX_IMAGES = 6;
const GOVERNORATES = ['north-gaza', 'gaza', 'deir-al-balah', 'khan-younis', 'rafah', ''];
const SOCIAL_HOSTS = ['instagram.com', 'tiktok.com', 'x.com', 'twitter.com', 'facebook.com', 'fb.watch', 'linkedin.com', 'youtube.com', 'youtu.be', 't.me'];

type Role = 'admin' | 'editor';
type Status = 'draft' | 'pending' | 'published' | 'hidden';

type Post = {
  id: string;
  status: Status;
  date: string;
  governorate: string;
  titleAr: string;
  titleEn: string;
  titleTr: string;
  textAr: string;
  textEn: string;
  textTr: string;
  images: string[];
  link: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  approvedBy?: string;
  approvedAt?: string;
};

// ---------- small helpers ----------

const emailList = (value: string | undefined) =>
  (value ?? '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

const roleOf = (email: string): Role | null => {
  if (emailList(process.env.ADMIN_EMAILS).includes(email)) {
    return 'admin';
  }
  if (emailList(process.env.EDITOR_EMAILS).includes(email)) {
    return 'editor';
  }
  return null;
};

const b64url = (value: Buffer | string) => Buffer.from(value).toString('base64url');

const sign = (purpose: string, payload: string) =>
  createHmac('sha256', ADMIN_SECRET).update(`${purpose}.${payload}`).digest('base64url');

const makeToken = (purpose: string, data: Record<string, unknown>) => {
  const payload = b64url(JSON.stringify(data));
  return `${payload}.${sign(purpose, payload)}`;
};

const readToken = (purpose: string, token: string): Record<string, any> | null => {
  const [payload, signature, extra] = String(token ?? '').split('.');
  if (!payload || !signature || extra !== undefined) {
    return null;
  }
  const expected = Buffer.from(sign(purpose, payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data || typeof data.exp !== 'number' || data.exp < Date.now()) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const readCookie = (req: any, name: string) => {
  const header = String(req.headers?.cookie ?? '');
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) {
      return rest.join('=');
    }
  }
  return '';
};

const isProduction = () => process.env.VERCEL_ENV === 'production';

const allowedHost = (host: string) => {
  if (SITE_HOSTS.includes(host)) {
    return true;
  }
  if (isProduction()) {
    return false;
  }
  return /^trahom-web(-[a-z0-9-]+)?\.vercel\.app$/.test(host) || host === 'localhost' || host === '127.0.0.1';
};

// Requests that change something must come from our own admin page.
const isFromOurSite = (req: any) => {
  const source = String(req.headers?.origin ?? req.headers?.referer ?? '');
  try {
    return allowedHost(new URL(source).hostname.toLowerCase());
  } catch {
    return false;
  }
};

const siteOrigin = (req: any) => {
  const host = String(req.headers?.host ?? '').toLowerCase();
  return allowedHost(host.split(':')[0]) ? `${host.startsWith('localhost') ? 'http' : 'https'}://${host}` : 'https://trahom.org';
};

const readJsonBody = async (req: any, limit: number): Promise<any | null> => {
  let parsed: unknown;
  try {
    parsed = req.body;
  } catch {
    return null;
  }
  if (parsed && typeof parsed === 'object' && !Buffer.isBuffer(parsed)) {
    return parsed;
  }
  if (typeof parsed === 'string' || Buffer.isBuffer(parsed)) {
    const text = String(parsed);
    try {
      return text.length > limit ? null : JSON.parse(text);
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
      if (body.length > limit) {
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

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\u0000/g, '').trim().slice(0, max) : '';

const oneLine = (value: string) => value.replace(/[\r\n\t]+/g, ' ');

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] as string);

const isSocialLink = (value: string) => {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase().replace(/^(www|m|mobile|vm)\./, '');
    return url.protocol === 'https:' && SOCIAL_HOSTS.some((item) => host === item || host.endsWith(`.${item}`));
  } catch {
    return false;
  }
};

const isOurImage = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.public.blob.vercel-storage.com') && url.pathname.startsWith('/images/');
  } catch {
    return false;
  }
};

const isoDate = (value: unknown) => {
  const match = text(value, 10).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return '';
  }
  const date = new Date(`${match[0]}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? '' : match[0];
};

const sendEmail = async (to: string[], subject: string, html: string, plain: string) => {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !to.length) {
    throw new Error('Email is not configured');
  }
  const response = await fetch('https://api.resend.com/emails', {
    signal: AbortSignal.timeout(10_000),
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: RESEND_FROM_EMAIL, to, subject, html, text: plain })
  });
  if (!response.ok) {
    throw new Error(`Resend failed with ${response.status}`);
  }
};

// Basic per-instance limit on sign-in emails, on top of the firewall.
const linkRequests = new Map<string, number[]>();
const tooManyLinkRequests = (key: string) => {
  const now = Date.now();
  if (linkRequests.size > 5000) {
    linkRequests.clear();
  }
  const recent = (linkRequests.get(key) ?? []).filter((time) => now - time < 15 * 60 * 1000);
  recent.push(now);
  linkRequests.set(key, recent);
  return recent.length > 5;
};

// ---------- storage ----------

const POST_FILE = /^posts\/([a-z0-9]{12})-[A-Za-z0-9]+\.json$/;

const readJsonUrl = async (url: string) => {
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(8_000) });
  if (!response.ok) {
    throw new Error(`Blob read failed with ${response.status}`);
  }
  return response.json();
};

const listAll = async (prefix: string) => {
  const blobs: Array<{ url: string; pathname: string; uploadedAt: Date }> = [];
  let cursor: string | undefined;
  do {
    const page: any = await list({ prefix, cursor, limit: 1000 });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
};

// Returns the newest version of every post, plus the older files that can be cleaned up.
const loadPosts = async () => {
  const files = await listAll('posts/');
  const newest = new Map<string, (typeof files)[number]>();
  const stale: string[] = [];
  for (const file of files) {
    const id = file.pathname.match(POST_FILE)?.[1];
    if (!id) {
      continue;
    }
    const current = newest.get(id);
    if (!current || new Date(file.uploadedAt) > new Date(current.uploadedAt)) {
      if (current) {
        stale.push(current.url);
      }
      newest.set(id, file);
    } else {
      stale.push(file.url);
    }
  }
  const posts = (await Promise.all([...newest.values()].map((file) => readJsonUrl(file.url).catch(() => null)))).filter(
    (post): post is Post => Boolean(post && post.id)
  );
  posts.sort((a, b) => (b.date || b.createdAt).localeCompare(a.date || a.createdAt));
  return { posts, files: newest, stale };
};

const savePost = async (post: Post, previousUrl?: string) => {
  await put(`posts/${post.id}.json`, JSON.stringify(post), {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60
  });
  if (previousUrl) {
    await del(previousUrl).catch(() => undefined);
  }
};

// The homepage reads only this file, so drafts and hidden posts never leave the admin.
const publicFields = (post: Post) => ({
  id: post.id,
  date: post.date,
  governorate: post.governorate,
  titleAr: post.titleAr,
  titleEn: post.titleEn,
  titleTr: post.titleTr,
  textAr: post.textAr,
  textEn: post.textEn,
  textTr: post.textTr,
  images: post.images,
  link: post.link
});

const rebuildFeed = async () => {
  const { posts, stale } = await loadPosts();
  const published = posts.filter((post) => post.status === 'published').slice(0, 30).map(publicFields);
  const oldFeeds = await listAll('feed/');
  await put('feed/feed.json', JSON.stringify({ updatedAt: new Date().toISOString(), posts: published }), {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60
  });
  const leftovers = [...oldFeeds.map((file) => file.url), ...stale];
  if (leftovers.length) {
    await del(leftovers).catch(() => undefined);
  }
};

const audit = async (email: string, action: string, postId: string, detail = '') => {
  const entry = { at: new Date().toISOString(), email, action, postId, detail };
  await put(`audit/${entry.at.replace(/[:.]/g, '-')}.json`, JSON.stringify(entry), {
    access: 'public',
    addRandomSuffix: true,
    contentType: 'application/json'
  }).catch((error) => console.error('Audit write failed', error));
};

// ---------- actions ----------

const requestLink = async (req: any, res: any) => {
  const body = await readJsonBody(req, MAX_JSON_BYTES);
  const email = oneLine(text(body?.email, 200)).toLowerCase();
  const ip = String(req.headers?.['x-forwarded-for'] ?? '').split(',')[0].trim() || 'unknown';
  // Same answer, after the same delay, whether or not the email is allowed, so the list of admins
  // cannot be guessed from the reply or from how long it takes.
  const startedAt = Date.now();
  const answer = async () => {
    const wait = 1800 + Math.floor(Math.random() * 400) - (Date.now() - startedAt);
    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
    res.status(200).json({ ok: true });
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || tooManyLinkRequests(`ip:${ip}`) || tooManyLinkRequests(`email:${email}`)) {
    await answer();
    return;
  }
  const role = roleOf(email);
  if (!role) {
    await answer();
    return;
  }
  const token = makeToken('login', { e: email, exp: Date.now() + LINK_MINUTES * 60 * 1000, n: b64url(randomBytes(9)) });
  const link = `${siteOrigin(req)}/api/admin?a=verify&t=${encodeURIComponent(token)}`;
  try {
    await sendEmail(
      [email],
      'رابط الدخول إلى لوحة موقع تراحم',
      `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:16px;line-height:1.7">
        <p>طلبت الدخول إلى لوحة موقع تراحم.</p>
        <p><a href="${escapeHtml(link)}" style="display:inline-block;background:#103b51;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none">الدخول إلى اللوحة</a></p>
        <p style="color:#666;font-size:14px">الرابط صالح لمدة ${LINK_MINUTES} دقيقة. إذا لم تطلب الدخول، تجاهل هذه الرسالة.</p>
      </div>`,
      `طلبت الدخول إلى لوحة موقع تراحم.\n${link}\nالرابط صالح لمدة ${LINK_MINUTES} دقيقة. إذا لم تطلب الدخول، تجاهل هذه الرسالة.`
    );
  } catch (error) {
    console.error('Sign-in email failed', error);
  }
  await answer();
};

const verifyLink = async (req: any, res: any) => {
  const url = new URL(String(req.url ?? ''), 'https://trahom.org');
  const data = readToken('login', url.searchParams.get('t') ?? '');
  const email = typeof data?.e === 'string' ? data.e : '';
  const nonce = typeof data?.n === 'string' && /^[A-Za-z0-9_-]{8,20}$/.test(data.n) ? data.n : '';
  // Each sign-in link works once: its random part is recorded the first time it is used.
  const alreadyUsed = nonce ? (await listAll(`used/${nonce}`)).length > 0 : true;
  if (!data || !roleOf(email) || alreadyUsed) {
    res.statusCode = 302;
    res.setHeader('Location', '/admin?login=expired');
    res.end();
    return;
  }
  await put(`used/${nonce}`, '1', { access: 'public', addRandomSuffix: true, contentType: 'text/plain' });
  const session = makeToken('session', { e: email, exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 });
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=${session}; Path=/api/admin; HttpOnly; ${isProduction() ? 'Secure; ' : ''}SameSite=Strict; Max-Age=${SESSION_DAYS * 24 * 60 * 60}`
  );
  res.setHeader('Cache-Control', 'no-store');
  res.statusCode = 302;
  res.setHeader('Location', '/admin');
  res.end();
  await audit(email, 'sign-in', '');
};

const currentUser = (req: any): { email: string; role: Role } | null => {
  const data = readToken('session', readCookie(req, SESSION_COOKIE));
  const email = typeof data?.e === 'string' ? data.e : '';
  const role = email ? roleOf(email) : null;
  return role ? { email, role } : null;
};

// Only photos that were uploaded through this admin (and are still in our store) can be used in a post,
// so an approved post can never point at a picture someone else controls and can swap later.
const ourImageUrls = async () => new Set((await listAll('images/')).map((file) => file.url));

const cleanPost = (input: any, allowedImages: Set<string>) => ({
  date: isoDate(input?.date) || new Date().toISOString().slice(0, 10),
  governorate: GOVERNORATES.includes(text(input?.governorate, 30)) ? text(input?.governorate, 30) : '',
  titleAr: oneLine(text(input?.titleAr, 140)),
  titleEn: oneLine(text(input?.titleEn, 140)),
  titleTr: oneLine(text(input?.titleTr, 140)),
  textAr: text(input?.textAr, 1500),
  textEn: text(input?.textEn, 1500),
  textTr: text(input?.textTr, 1500),
  images: (Array.isArray(input?.images) ? input.images : [])
    .map((item: unknown) => text(item, 400))
    .filter((url: string) => isOurImage(url) && allowedImages.has(url))
    .slice(0, MAX_IMAGES),
  link: (() => {
    const link = text(input?.link, 400);
    return link && isSocialLink(link) ? link : '';
  })()
});

const notifyAdmins = async (req: any, post: Post, editor: string) => {
  const title = post.titleAr || post.titleEn || post.titleTr || '(بدون عنوان)';
  const link = `${siteOrigin(req)}/admin`;
  try {
    await sendEmail(
      emailList(process.env.ADMIN_EMAILS),
      `منشور جديد بانتظار موافقتك: ${oneLine(title).slice(0, 80)}`,
      `<div dir="rtl" style="font-family:Arial,sans-serif;font-size:16px;line-height:1.7">
        <p>أرسل <b>${escapeHtml(editor)}</b> منشورًا جديدًا لقسم «من الميدان»، ولن يظهر على الموقع قبل موافقتك:</p>
        <p style="background:#f5f5f5;padding:12px;border-radius:8px"><b>${escapeHtml(title)}</b><br>${escapeHtml((post.textAr || post.textEn).slice(0, 300))}</p>
        <p><a href="${escapeHtml(link)}" style="display:inline-block;background:#103b51;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none">مراجعة المنشور</a></p>
      </div>`,
      `أرسل ${editor} منشورًا جديدًا بانتظار موافقتك: ${title}\n${link}`
    );
  } catch (error) {
    console.error('Approval notice failed', error);
  }
};

const savePostAction = async (req: any, res: any, user: { email: string; role: Role }) => {
  const body = await readJsonBody(req, MAX_JSON_BYTES);
  if (!body) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  const fields = cleanPost(body.post, await ourImageUrls());
  if (!fields.titleAr && !fields.titleEn && !fields.titleTr) {
    res.status(400).json({ error: 'title-required' });
    return;
  }
  const intent = text(body.intent, 10);
  // Editors can only save drafts or send for approval; only admins can publish.
  const status: Status =
    user.role === 'admin' ? (intent === 'publish' ? 'published' : 'draft') : intent === 'submit' ? 'pending' : 'draft';

  const { posts, files } = await loadPosts();
  const id = text(body.id, 12);
  const existing = id ? posts.find((post) => post.id === id) : undefined;
  if (id && !existing) {
    res.status(404).json({ error: 'not-found' });
    return;
  }
  // Editors may change only their own posts that are not live yet.
  if (existing && user.role === 'editor' && (existing.createdBy !== user.email || ['published', 'hidden'].includes(existing.status))) {
    res.status(403).json({ error: 'forbidden' });
    return;
  }
  const now = new Date().toISOString();
  const post: Post = {
    ...(existing ?? { id: randomBytes(6).toString('hex'), createdBy: user.email, createdAt: now }),
    ...fields,
    status,
    updatedBy: user.email,
    updatedAt: now,
    ...(status === 'published' ? { approvedBy: user.email, approvedAt: now } : {})
  } as Post;

  await savePost(post, existing ? files.get(existing.id)?.url : undefined);
  if (status === 'published' || existing?.status === 'published') {
    await rebuildFeed();
  }
  await audit(user.email, existing ? `save:${status}` : `create:${status}`, post.id);
  if (status === 'pending' && existing?.status !== 'pending') {
    await notifyAdmins(req, post, user.email);
  }
  res.status(200).json({ post });
};

const setStatusAction = async (req: any, res: any, user: { email: string; role: Role }) => {
  if (user.role !== 'admin') {
    res.status(403).json({ error: 'forbidden' });
    return;
  }
  const body = await readJsonBody(req, MAX_JSON_BYTES);
  const id = text(body?.id, 12);
  const status = text(body?.status, 10) as Status;
  if (!['published', 'hidden', 'draft'].includes(status)) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  const { posts, files } = await loadPosts();
  const existing = posts.find((post) => post.id === id);
  if (!existing) {
    res.status(404).json({ error: 'not-found' });
    return;
  }
  // Publish exactly the version the admin looked at: if it changed since, ask them to review again.
  if (text(body?.updatedAt, 40) !== existing.updatedAt) {
    res.status(409).json({ error: 'changed' });
    return;
  }
  const now = new Date().toISOString();
  const post: Post = {
    ...existing,
    status,
    updatedBy: user.email,
    updatedAt: now,
    ...(status === 'published' ? { approvedBy: user.email, approvedAt: now } : {})
  };
  await savePost(post, files.get(id)?.url);
  await rebuildFeed();
  await audit(user.email, `status:${status}`, id);
  res.status(200).json({ post });
};

const deleteAction = async (req: any, res: any, user: { email: string; role: Role }) => {
  const body = await readJsonBody(req, MAX_JSON_BYTES);
  const id = text(body?.id, 12);
  const { posts, files } = await loadPosts();
  const existing = posts.find((post) => post.id === id);
  if (!existing) {
    res.status(404).json({ error: 'not-found' });
    return;
  }
  // Editors may delete only their own posts that never went live.
  if (user.role !== 'admin' && (existing.createdBy !== user.email || ['published', 'hidden'].includes(existing.status))) {
    res.status(403).json({ error: 'forbidden' });
    return;
  }
  const url = files.get(id)?.url;
  if (url) {
    await del(url);
  }
  // Remove the post's photos too, unless another post uses them.
  const stillUsed = new Set(posts.filter((post) => post.id !== id).flatMap((post) => post.images));
  const orphanImages = existing.images.filter((image) => !stillUsed.has(image));
  if (orphanImages.length) {
    await del(orphanImages).catch(() => undefined);
  }
  if (existing.status === 'published') {
    await rebuildFeed();
  }
  await audit(user.email, 'delete', id, existing.titleAr || existing.titleEn);
  res.status(200).json({ ok: true });
};

const IMAGE_TYPES: Array<{ type: string; ext: string; test: (bytes: Buffer) => boolean }> = [
  { type: 'image/jpeg', ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { type: 'image/png', ext: 'png', test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { type: 'image/webp', ext: 'webp', test: (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP' }
];

const uploadAction = async (req: any, res: any, user: { email: string; role: Role }) => {
  const body = await readJsonBody(req, MAX_UPLOAD_BYTES);
  const data = typeof body?.data === 'string' ? body.data.replace(/^data:[^,]*,/, '') : '';
  if (!data || !/^[A-Za-z0-9+/=]+$/.test(data)) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  const bytes = Buffer.from(data, 'base64');
  if (bytes.length > MAX_IMAGE_BYTES) {
    res.status(413).json({ error: 'too-large' });
    return;
  }
  // Trust the file's own bytes, not its name or the type the browser claims.
  const kind = IMAGE_TYPES.find((item) => item.test(bytes));
  if (!kind) {
    res.status(415).json({ error: 'not-an-image' });
    return;
  }
  const blob = await put(`images/photo.${kind.ext}`, bytes, {
    access: 'public',
    addRandomSuffix: true,
    contentType: kind.type
  });
  await audit(user.email, 'upload', '', blob.pathname);
  res.status(200).json({ url: blob.url });
};

const auditAction = async (res: any, user: { email: string; role: Role }) => {
  if (user.role !== 'admin') {
    res.status(403).json({ error: 'forbidden' });
    return;
  }
  const files = (await listAll('audit/')).sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(0, 60);
  const entries = (await Promise.all(files.map((file) => readJsonUrl(file.url).catch(() => null)))).filter(Boolean);
  res.status(200).json({ entries });
};

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (ADMIN_SECRET.length < 32 || !process.env.ADMIN_EMAILS || !process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(503).json({ error: 'not-configured' });
    return;
  }

  const action = new URL(String(req.url ?? ''), 'https://trahom.org').searchParams.get('a') ?? '';

  try {
    if (req.method === 'GET' && action === 'verify') {
      await verifyLink(req, res);
      return;
    }

    if (req.method === 'POST' && !isFromOurSite(req)) {
      res.status(403).json({ error: 'forbidden' });
      return;
    }

    if (req.method === 'POST' && action === 'request-link') {
      await requestLink(req, res);
      return;
    }

    if (req.method === 'POST' && action === 'logout') {
      res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/api/admin; HttpOnly; ${isProduction() ? 'Secure; ' : ''}SameSite=Strict; Max-Age=0`);
      res.status(200).json({ ok: true });
      return;
    }

    const user = currentUser(req);
    if (!user) {
      res.status(401).json({ error: 'signed-out' });
      return;
    }

    if (req.method === 'GET' && action === 'me') {
      res.status(200).json({ email: user.email, role: user.role });
      return;
    }
    if (req.method === 'GET' && action === 'posts') {
      const { posts } = await loadPosts();
      res.status(200).json({ posts });
      return;
    }
    if (req.method === 'GET' && action === 'audit') {
      await auditAction(res, user);
      return;
    }
    if (req.method === 'POST' && action === 'save') {
      await savePostAction(req, res, user);
      return;
    }
    if (req.method === 'POST' && action === 'status') {
      await setStatusAction(req, res, user);
      return;
    }
    if (req.method === 'POST' && action === 'delete') {
      await deleteAction(req, res, user);
      return;
    }
    if (req.method === 'POST' && action === 'upload') {
      await uploadAction(req, res, user);
      return;
    }
    res.status(404).json({ error: 'unknown-action' });
  } catch (error) {
    console.error('Admin action failed', action, error);
    res.status(500).json({ error: 'server' });
  }
}
