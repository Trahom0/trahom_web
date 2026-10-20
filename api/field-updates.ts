// Published "From the field" posts for the homepage. Only posts approved in the website admin (/admin)
// are in this feed; drafts and posts waiting for approval never leave the admin.
import { list } from '@vercel/blob';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(503).json({ error: 'Updates are not configured' });
    return;
  }

  try {
    const { blobs } = await list({ prefix: 'feed/', limit: 20 });
    const newest = blobs.sort((a: any, b: any) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0];
    if (!newest) {
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
      res.status(200).json({ posts: [] });
      return;
    }
    const response = await fetch(newest.url, { cache: 'no-store', signal: AbortSignal.timeout(8_000) });
    if (!response.ok) {
      console.error('Field updates feed read failed', response.status);
      res.status(502).json({ error: 'Unable to load updates' });
      return;
    }
    const feed = await response.json();
    // Short edge cache: a newly approved post shows up within about two minutes.
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    res.status(200).json({ posts: Array.isArray(feed?.posts) ? feed.posts : [] });
  } catch (error) {
    console.error('Field updates failed', error);
    res.status(500).json({ error: 'Unable to load updates' });
  }
}
