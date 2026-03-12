import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const outputPath = path.join(publicDir, 'sitemap.xml');

const baseUrl = (process.env.SITE_URL ?? 'https://trahom.org').replace(/\/$/, '');
const lastmod = new Date().toISOString().split('T')[0];

const pages = [
  '/',
  '/mission',
  '/impact',
  '/campaigns',
  '/contact',
  '/donate',
  '/gallery',
  '/careers',
  '/family-signup',
  '/sponsor-orphan',
  '/privacy-policy',
  '/terms-of-service'
];

const languages = [
  { code: 'EN', prefix: '', hreflang: 'en' },
  { code: 'AR', prefix: '/ar', hreflang: 'ar' },
  { code: 'TR', prefix: '/tr', hreflang: 'tr' }
];

const buildPath = (prefix, route) => {
  if (!prefix) {
    return route;
  }
  if (route === '/') {
    return prefix;
  }
  return `${prefix}${route}`;
};

const buildUrl = (prefix, route) => `${baseUrl}${buildPath(prefix, route)}`;

const buildAlternateLinks = (route) => {
  const alternates = languages.map(({ prefix, hreflang }) =>
    `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${buildUrl(prefix, route)}" />`
  );
  alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl('', route)}" />`);
  return alternates.join('\n');
};

const urls = pages
  .flatMap((route) =>
    languages.map(({ prefix }) => {
      const loc = buildUrl(prefix, route);
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        buildAlternateLinks(route),
        '  </url>'
      ].join('\n');
    })
  )
  .join('\n');

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  urls,
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(outputPath, xml, 'utf-8');

const robotsPath = path.join(publicDir, 'robots.txt');
const robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
fs.writeFileSync(robotsPath, robots, 'utf-8');
