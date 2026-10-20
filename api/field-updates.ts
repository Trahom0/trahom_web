// Published "From the field" posts for the homepage. Only posts approved in the website admin (/admin)
// are in this feed; drafts and posts waiting for approval never leave the admin.
//
// The feed is a single public file in the Blob store (feed/feed.json). Its address is built from the store
// id, so no store listing is needed: listing is the scarcest operation on Vercel's free plan.

const storeId = () => {
  const fromEnv = process.env.BLOB_STORE_ID ?? '';
  const fromToken = (process.env.BLOB_READ_WRITE_TOKEN ?? '').split('_')[3] ?? '';
  const id = (fromEnv || fromToken).replace(/^store_/, '');
  return /^[A-Za-z0-9]+$/.test(id) ? id : '';
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const id = storeId();
  if (!id) {
    res.status(503).json({ error: 'Updates are not configured' });
    return;
  }

  try {
    const response = await fetch(`https://${id}.public.blob.vercel-storage.com/feed/feed.json`, {
      signal: AbortSignal.timeout(8_000)
    });
    // Cached on Vercel's edge for 10 minutes: new posts show up within about 10 minutes, and the store is
    // read only a few times an hour however many people visit.
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    if (response.status === 404) {
      res.status(200).json({ posts: [] });
      return;
    }
    if (!response.ok) {
      console.error('Field updates feed read failed', response.status);
      res.setHeader('Cache-Control', 'no-store');
      res.status(502).json({ error: 'Unable to load updates' });
      return;
    }
    const feed = await response.json();
    res.status(200).json({ posts: Array.isArray(feed?.posts) ? feed.posts : [] });
  } catch (error) {
    console.error('Field updates failed', error);
    res.setHeader('Cache-Control', 'no-store');
    res.status(500).json({ error: 'Unable to load updates' });
  }
}
