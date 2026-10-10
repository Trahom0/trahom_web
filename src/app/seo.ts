import { getPathForPage, type LanguageCode, type PageKey } from './routes';

type SeoPage = {
  title: string;
  description: string;
  keywords: string;
  schemaType?: string;
  robots?: string;
  faq?: Array<{ question: string; answer: string }>;
};

type SeoConfig = {
  languageCode: string;
  htmlLang: string;
  locale: string;
  siteName: string;
  siteTagline: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  themeColor: string;
  ogImage: string;
  ogImageAlt: string;
  twitterHandle?: string;
  organization: {
    name: string;
    description: string;
    areaServed?: readonly string[];
    email?: string;
    phone?: string;
    sameAs?: readonly string[];
  };
  pages: Record<PageKey, SeoPage>;
};

type ApplySeoArgs = {
  page: PageKey;
  seo: SeoConfig;
  path: string;
};

type SeoPayload = {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  canonical: string;
  ogImage: string;
  ogImageAlt: string;
  locale: string;
  ogLocaleAlternates: string[];
  siteName: string;
  themeColor: string;
  twitterHandle?: string;
  htmlLang: string;
  hreflangs: Array<{ hreflang: string; href: string }>;
  xDefault: string;
  jsonLd: unknown;
};

const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
  if (!content || typeof document === 'undefined') {
    return;
  }
  const selector = `meta[${attribute}="${key}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setLinkTag = (rel: string, href: string) => {
  if (!href || typeof document === 'undefined') {
    return;
  }
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const setAlternateLink = (hreflang: string, href: string) => {
  if (!href || typeof document === 'undefined') {
    return;
  }
  const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
  let link = document.querySelector(selector) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

const setJsonLd = (id: string, data: unknown) => {
  if (typeof document === 'undefined') {
    return;
  }
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
};

const toAbsoluteUrl = (url: string, origin: string) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  if (!origin) {
    return url;
  }
  return `${origin}${url.startsWith('/') ? url : `/${url}`}`;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const shortenTitle = (value: string) => value.split('|')[0]?.trim() || value;

const buildSeoPayload = ({ page, seo, path, origin }: ApplySeoArgs & { origin?: string }): SeoPayload => {
  const pageMeta = seo.pages[page] ?? {
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    keywords: seo.defaultKeywords
  };
  const title = pageMeta.title || seo.defaultTitle;
  const description = pageMeta.description || seo.defaultDescription;
  const keywords = pageMeta.keywords || seo.defaultKeywords;
  const robots = pageMeta.robots ?? 'index, follow';

  const resolvedOrigin = origin ?? (typeof window !== 'undefined' ? window.location.origin : '');
  const canonical = resolvedOrigin ? `${resolvedOrigin}${path}` : path;
  const ogImage = toAbsoluteUrl(seo.ogImage, resolvedOrigin);
  const languageCode = (seo.languageCode as LanguageCode) ?? 'EN';
  const localeMap: Record<LanguageCode, string> = {
    EN: 'en_US',
    AR: 'ar_AR',
    TR: 'tr_TR'
  };
  const ogLocaleAlternates = Object.values(localeMap).filter((locale) => locale !== seo.locale);
  const hreflangMap: Array<{ code: LanguageCode; hreflang: string }> = [
    { code: 'EN', hreflang: 'en' },
    { code: 'AR', hreflang: 'ar' },
    { code: 'TR', hreflang: 'tr' }
  ];
  const hreflangs = hreflangMap.map(({ code, hreflang }) => ({
    hreflang,
    href: toAbsoluteUrl(getPathForPage(page, code), resolvedOrigin)
  }));
  const xDefault = toAbsoluteUrl(getPathForPage(page, 'EN'), resolvedOrigin);

  const organizationId = `${resolvedOrigin}/#organization`;
  const websiteId = `${resolvedOrigin}/#website`;
  const pageId = `${canonical}#webpage`;
  const homeUrl = toAbsoluteUrl(getPathForPage('home', languageCode), resolvedOrigin);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: seo.siteName,
      item: homeUrl
    }
  ];
  if (page !== 'home') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: shortenTitle(title),
      item: canonical
    });
  }
  const contactPoints = [] as Array<{ '@type': 'ContactPoint'; contactType: string; email?: string; telephone?: string }>;
  if (seo.organization.email || seo.organization.phone) {
    contactPoints.push({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: seo.organization.email,
      telephone: seo.organization.phone
    });
  }

  const extraGraph: unknown[] = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems
    }
  ];

  if (page === 'campaigns') {
    extraGraph.push({
      '@type': 'FundraisingCampaign',
      '@id': `${canonical}#campaigns`,
      name: shortenTitle(title),
      description,
      url: canonical,
      organizer: {
        '@id': organizationId
      },
      inLanguage: seo.locale
    });
  }

  if (page === 'donate') {
    extraGraph.push({
      '@type': 'DonateAction',
      '@id': `${canonical}#donate`,
      name: shortenTitle(title),
      description,
      target: {
        '@type': 'EntryPoint',
        urlTemplate: canonical,
        inLanguage: seo.locale,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      recipient: {
        '@id': organizationId
      }
    });

    if (pageMeta.faq?.length) {
      extraGraph.push({
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: pageMeta.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      });
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NonprofitOrganization',
        '@id': organizationId,
        name: seo.organization.name || seo.siteName,
        url: resolvedOrigin,
        description: seo.organization.description || seo.defaultDescription,
        areaServed: seo.organization.areaServed,
        sameAs: seo.organization.sameAs,
        contactPoint: contactPoints.length ? contactPoints : undefined
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: resolvedOrigin,
        name: seo.siteName,
        description: seo.defaultDescription,
        inLanguage: seo.locale,
        publisher: {
          '@id': organizationId
        }
      },
      {
        '@type': pageMeta.schemaType ?? 'WebPage',
        '@id': pageId,
        url: canonical,
        name: title,
        description,
        inLanguage: seo.locale,
        isPartOf: {
          '@id': websiteId
        },
        about: {
          '@id': organizationId
        },
        keywords,
        primaryImageOfPage: ogImage
          ? {
              '@type': 'ImageObject',
              url: ogImage
            }
          : undefined
      },
      ...extraGraph
    ]
  };

  return {
    title,
    description,
    keywords,
    robots,
    canonical,
    ogImage,
    ogImageAlt: seo.ogImageAlt,
    locale: seo.locale,
    ogLocaleAlternates,
    siteName: seo.siteName,
    themeColor: seo.themeColor,
    twitterHandle: seo.twitterHandle,
    htmlLang: seo.htmlLang || 'en',
    hreflangs,
    xDefault,
    jsonLd
  };
};


export const getTextDirection = (htmlLang?: string) => (htmlLang?.toLowerCase().startsWith('ar') ? 'rtl' : 'ltr');

export const buildSeoTags = ({ page, seo, path, origin }: ApplySeoArgs & { origin?: string }) => {
  const payload = buildSeoPayload({ page, seo, path, origin });
  const metaTag = (attribute: 'name' | 'property', key: string, content: string) =>
    content ? `<meta ${attribute}="${key}" content="${escapeHtml(content)}">` : '';
  const linkTag = (rel: string, href: string) =>
    href ? `<link rel="${rel}" href="${escapeHtml(href)}">` : '';

  const tags = [
    `<title>${escapeHtml(payload.title)}</title>`,
    metaTag('name', 'description', payload.description),
    metaTag('name', 'keywords', payload.keywords),
    metaTag('name', 'robots', payload.robots),
    metaTag('name', 'author', payload.siteName),
    metaTag('name', 'theme-color', payload.themeColor),
    metaTag('name', 'application-name', payload.siteName),
    linkTag('canonical', payload.canonical),
    ...payload.hreflangs.map(({ hreflang, href }) =>
      href ? `<link rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}">` : ''
    ),
    payload.xDefault
      ? `<link rel="alternate" hreflang="x-default" href="${escapeHtml(payload.xDefault)}">`
      : '',
    metaTag('property', 'og:title', payload.title),
    metaTag('property', 'og:description', payload.description),
    metaTag('property', 'og:type', 'website'),
    metaTag('property', 'og:url', payload.canonical),
    metaTag('property', 'og:site_name', payload.siteName),
    metaTag('property', 'og:locale', payload.locale),
    metaTag('property', 'og:image', payload.ogImage),
    metaTag('property', 'og:image:alt', payload.ogImageAlt),
    ...payload.ogLocaleAlternates.map((locale) => metaTag('property', 'og:locale:alternate', locale)),
    metaTag('name', 'twitter:card', 'summary_large_image'),
    metaTag('name', 'twitter:title', payload.title),
    metaTag('name', 'twitter:description', payload.description),
    metaTag('name', 'twitter:image', payload.ogImage),
    metaTag('name', 'twitter:image:alt', payload.ogImageAlt),
    payload.twitterHandle ? metaTag('name', 'twitter:site', payload.twitterHandle) : '',
    `<script type="application/ld+json">${JSON.stringify(payload.jsonLd)}</script>`
  ]
    .filter(Boolean)
    .join('\n');

  return {
    tags,
    htmlLang: payload.htmlLang
  };
};

const setMetaTags = (attribute: 'name' | 'property', key: string, contents: string[]) => {
  if (typeof document === 'undefined') {
    return;
  }
  const selector = `meta[${attribute}="${key}"]`;
  const existing = Array.from(document.querySelectorAll(selector)) as HTMLMetaElement[];
  contents.forEach((content, index) => {
    if (!content) {
      return;
    }
    let tag = existing[index];
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, key);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  });
  if (existing.length > contents.length) {
    existing.slice(contents.length).forEach((tag) => tag.remove());
  }
};

export const applySeo = ({ page, seo, path }: ApplySeoArgs) => {
  if (typeof document === 'undefined') {
    return;
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const payload = buildSeoPayload({ page, seo, path, origin });

  document.title = payload.title;
  document.documentElement.lang = payload.htmlLang || 'en';
  // Arabic pages read right-to-left; this flips the whole layout (menus, icons, alignment).
  document.documentElement.dir = getTextDirection(payload.htmlLang);

  setMetaTag('name', 'description', payload.description);
  setMetaTag('name', 'keywords', payload.keywords);
  setMetaTag('name', 'robots', payload.robots);
  setMetaTag('name', 'author', payload.siteName);
  setMetaTag('name', 'theme-color', payload.themeColor);
  setMetaTag('name', 'application-name', payload.siteName);

  setLinkTag('canonical', payload.canonical);
  payload.hreflangs.forEach(({ hreflang, href }) => {
    setAlternateLink(hreflang, href);
  });
  setAlternateLink('x-default', payload.xDefault);

  setMetaTag('property', 'og:title', payload.title);
  setMetaTag('property', 'og:description', payload.description);
  setMetaTag('property', 'og:type', 'website');
  setMetaTag('property', 'og:url', payload.canonical);
  setMetaTag('property', 'og:site_name', payload.siteName);
  setMetaTag('property', 'og:locale', payload.locale);
  setMetaTag('property', 'og:image', payload.ogImage);
  setMetaTag('property', 'og:image:alt', payload.ogImageAlt);
  setMetaTags('property', 'og:locale:alternate', payload.ogLocaleAlternates);

  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', payload.title);
  setMetaTag('name', 'twitter:description', payload.description);
  setMetaTag('name', 'twitter:image', payload.ogImage);
  setMetaTag('name', 'twitter:image:alt', payload.ogImageAlt);
  if (payload.twitterHandle) {
    setMetaTag('name', 'twitter:site', payload.twitterHandle);
  }

  setJsonLd('seo-jsonld', payload.jsonLd);
};
