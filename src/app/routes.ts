export const pagePaths = {
  home: '/',
  mission: '/mission',
  impact: '/impact',
  campaigns: '/campaigns',
  contact: '/contact',
  donate: '/donate',
  gallery: '/gallery',
  careers: '/careers',
  'family-signup': '/family-signup',
  'sponsor-orphan': '/sponsor-orphan',
  privacy: '/privacy-policy',
  terms: '/terms-of-service',
  'not-found': '/404'
} as const;

export type PageKey = keyof typeof pagePaths;

export const languagePrefixes = {
  EN: '',
  AR: '/ar',
  TR: '/tr'
} as const;

export type LanguageCode = keyof typeof languagePrefixes;

const languageAliasMap: Record<string, LanguageCode> = {
  en: 'EN',
  ar: 'AR',
  tr: 'TR'
};

const pathPageMap: Record<string, PageKey> = {
  '/': 'home',
  '/index.html': 'home',
  '/mission': 'mission',
  '/impact': 'impact',
  '/campaigns': 'campaigns',
  '/contact': 'contact',
  '/donate': 'donate',
  '/gallery': 'gallery',
  '/careers': 'careers',
  '/family-signup': 'family-signup',
  '/sponsor-orphan': 'sponsor-orphan',
  '/privacy': 'privacy',
  '/privacy-policy': 'privacy',
  '/terms': 'terms',
  '/terms-of-service': 'terms',
  '/404': 'not-found'
};

const normalizePath = (path: string) => {
  const cleaned = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return cleaned === '' ? '/' : cleaned;
};

export const getRouteFromPath = (path: string): { page: PageKey; language: LanguageCode } => {
  const normalized = normalizePath(path);
  const segments = normalized.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();
  const language = firstSegment && languageAliasMap[firstSegment] ? languageAliasMap[firstSegment] : 'EN';
  const remainingPath = firstSegment && languageAliasMap[firstSegment]
    ? `/${segments.slice(1).join('/')}`
    : normalized;
  const routePath = remainingPath === '/' || remainingPath === '' ? '/' : remainingPath;
  return {
    // Unknown addresses show the "page not found" page instead of silently showing the homepage.
    page: pathPageMap[routePath] ?? 'not-found',
    language
  };
};

export const getPageFromPath = (path: string): PageKey => getRouteFromPath(path).page;

export const localizePath = (path: string, language: LanguageCode): string => {
  const prefix = languagePrefixes[language] ?? '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!prefix) {
    return normalized;
  }
  if (normalized === '/') {
    return prefix;
  }
  if (normalized === prefix || normalized.startsWith(`${prefix}/`)) {
    return normalized;
  }
  return `${prefix}${normalized}`;
};

export const getPathForPage = (page: PageKey, language: LanguageCode): string =>
  localizePath(pagePaths[page], language);

export const actionPaths = {
  donate: pagePaths.donate,
  volunteer: pagePaths.contact,
  fundraise: pagePaths.contact,
  partner: pagePaths.contact,
  sponsorOrphan: pagePaths['sponsor-orphan']
} as const;

export const socialLinks = {
  facebook: '',
  instagram: 'https://www.instagram.com/trahom.charity',
  linkedin: 'https://www.linkedin.com/company/trahomorg/',
  twitter: 'https://x.com/TrahomGaza',
  tiktok: 'https://www.tiktok.com/@trahomgaza',
  telegram: 'https://t.me/trahom1'
} as const;
