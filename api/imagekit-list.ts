const CDN_API_URL = process.env.CDN_API_URL;
const CDN_API_KEY = process.env.CDN_API_KEY;
// تم ضبط الافتراضي على 'videos'
const CDN_TARGET_FOLDER = process.env.CDN_TARGET_FOLDER ?? 'videos'; 

type HostingerFile = {
  name: string;
  project: string;
  rel_path: string;
  url: string;
  time: number;
  is_video: boolean;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!CDN_API_URL || !CDN_API_KEY) {
    res.status(500).json({ error: 'CDN configuration is missing in environment variables' });
    return;
  }

  try {
    const params = new URLSearchParams({
      api: 'true',
      api_key: CDN_API_KEY,
      action: 'get_files',
      folder: CDN_TARGET_FOLDER
    });

    const response = await fetch(`${CDN_API_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error from CDN! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'success') {
      res.status(500).json({ error: data.message ?? 'Failed to list files from CDN' });
      return;
    }

    const cdnFiles = Array.isArray(data.data) ? (data.data as HostingerFile[]) : [];

    const formattedFiles = cdnFiles.map((file) => {
      const isoDate = new Date(file.time * 1000).toISOString();
      
      return {
        fileId: Buffer.from(file.rel_path).toString('base64'),
        name: file.name,
        filePath: `/${file.rel_path}`,
        url: file.url,
        fileType: file.is_video ? 'video' : 'image',
        mime: file.is_video ? 'video/mp4' : 'image/jpeg', 
        createdAt: isoDate,
        updatedAt: isoDate
      };
    });

    res.status(200).json({ files: formattedFiles });
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to connect to Custom CDN';
    res.status(500).json({ error: message });
  }
}