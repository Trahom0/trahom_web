// Returns only the public part of the orphan profiles (code, short descriptions, photo).
// The source sheet is read on the server, so its address and its private columns
// (parents, siblings, age, health…) never reach the visitor's browser.
// Set ORPHANS_CSV_URL in Vercel → Settings → Environment Variables.
const ORPHANS_CSV_URL = process.env.ORPHANS_CSV_URL;

type OrphanProfile = {
  code: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTr: string;
  image: string;
};

const parseCsv = (text: string) => {
  const rows: string[][] = [];
  let current = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (char === '"') {
      if (inQuotes && text[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(current);
      current = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[index + 1] === '\n') {
        index += 1;
      }
      row.push(current);
      if (row.some((cell) => cell.trim() !== '')) {
        rows.push(row);
      }
      row = [];
      current = '';
      continue;
    }

    current += char;
  }

  if (current.length || row.length) {
    row.push(current);
    if (row.some((cell) => cell.trim() !== '')) {
      rows.push(row);
    }
  }

  return rows;
};

const normalize = (value: string) => value.trim().toLowerCase().replace(/[_\s]+/g, ' ');

const buildProfiles = (text: string): OrphanProfile[] => {
  const rows = parseCsv(text);
  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map(normalize);
  const find = (candidates: string[]) => headers.findIndex((header) => candidates.includes(header));

  const codeIndex = find(['code', 'id', 'orphan code']);
  const enIndex = find(['description en', 'discription en']);
  const arIndex = find(['description ar', 'discription ar']);
  const trIndex = find(['description tr', 'discription tr']);
  const fallbackIndex = enIndex < 0 && arIndex < 0 && trIndex < 0 ? find(['description', 'discription']) : -1;
  const imageIndex = find(['image', 'image url', 'link', 'photo']);

  if (codeIndex < 0) {
    return [];
  }

  const cell = (row: string[], index: number) => (index >= 0 ? (row[index] ?? '').trim() : '');
  const safeImage = (url: string) => (/^https:\/\//i.test(url) ? url : '');

  return rows
    .slice(1)
    .map((row) => {
      const fallback = cell(row, fallbackIndex);
      return {
        code: cell(row, codeIndex).slice(0, 40),
        descriptionEn: (cell(row, enIndex) || fallback).slice(0, 1000),
        descriptionAr: (cell(row, arIndex) || fallback).slice(0, 1000),
        descriptionTr: (cell(row, trIndex) || fallback).slice(0, 1000),
        image: safeImage(cell(row, imageIndex))
      };
    })
    .filter((profile) => profile.code && (profile.descriptionEn || profile.descriptionAr || profile.descriptionTr));
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!ORPHANS_CSV_URL) {
    res.status(503).json({ error: 'Orphan profiles are not configured' });
    return;
  }

  try {
    const response = await fetch(ORPHANS_CSV_URL);
    if (!response.ok) {
      console.error('Orphan sheet fetch failed', response.status);
      res.status(502).json({ error: 'Unable to load profiles' });
      return;
    }

    const profiles = buildProfiles(await response.text());
    // Cache on Vercel's edge for 5 minutes so the sheet is not hit on every visit.
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json({ profiles });
  } catch (error) {
    console.error('Orphan profiles failed', error);
    res.status(500).json({ error: 'Unable to load profiles' });
  }
}
