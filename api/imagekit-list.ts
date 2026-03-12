const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIT_VIDEO_FOLDER = process.env.IMAGEKIT_VIDEO_FOLDER ?? '/Videos';

type ImageKitFile = {
  fileId: string;
  name: string;
  filePath: string;
  url: string;
  fileType?: string;
  mime?: string;
  createdAt?: string;
  updatedAt?: string;
};

const buildAuthHeader = (privateKey: string) => {
  const token = Buffer.from(`${privateKey}:`).toString('base64');
  return `Basic ${token}`;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!IMAGEKIT_PRIVATE_KEY) {
    res.status(500).json({ error: 'ImageKit private key is missing' });
    return;
  }

  try {
    const params = new URLSearchParams({
      path: IMAGEKIT_VIDEO_FOLDER,
      fileType: 'video',
      limit: '1000',
      skip: '0'
    });

    const response = await fetch(`https://api.imagekit.io/v1/files?${params.toString()}`, {
      headers: {
        Authorization: buildAuthHeader(IMAGEKIT_PRIVATE_KEY)
      }
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status).json({ error: data?.message ?? 'Failed to list ImageKit files' });
      return;
    }

    const files = Array.isArray(data) ? (data as ImageKitFile[]) : [];
    res.status(200).json({
      files: files.map((file) => ({
        fileId: file.fileId,
        name: file.name,
        filePath: file.filePath,
        url: file.url,
        fileType: file.fileType,
        mime: file.mime,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt
      }))
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to list ImageKit files';
    res.status(500).json({ error: message });
  }
}
