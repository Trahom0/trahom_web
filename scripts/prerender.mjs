import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const sitemapPath = path.join(distDir, 'sitemap.xml');
const serverDir = path.join(distDir, 'server');

const templateCandidates = [
  path.join(distDir, 'index.html'),
  path.join(distDir, 'client', 'index.html')
];
const templatePath = templateCandidates.find((candidate) => fs.existsSync(candidate));

if (!templatePath) {
  throw new Error('SSR prerender could not find a built index.html in dist.');
}

const template = fs.readFileSync(templatePath, 'utf-8');
const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
const locMatches = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)];
const routes = Array.from(
  new Set(
    locMatches
      .map((match) => {
        try {
          return new URL(match[1]).pathname || '/';
        } catch {
          return '/';
        }
      })
      .filter(Boolean)
  )
);

const serverEntryName = ['entry-server.js', 'entry-server.mjs', 'entry-server.cjs'].find((file) =>
  fs.existsSync(path.join(serverDir, file))
);

if (!serverEntryName) {
  throw new Error('SSR entry not found in dist/server.');
}

const { render } = await import(pathToFileURL(path.join(serverDir, serverEntryName)).href);
const origin = (process.env.SITE_URL ?? 'https://trahom.org').replace(/\/$/, '');

const renderRoute = (route) => {
  const { html, head, htmlLang } = render(route, origin);
  let pageHtml = template;
  pageHtml = pageHtml.replace('<!--seo-head-->', head);
  pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  pageHtml = pageHtml.replace(/<html[^>]*>/, `<html lang="${htmlLang}">`);
  return pageHtml;
};

routes.forEach((route) => {
  const cleanRoute = route === '' ? '/' : route;
  const outputPath = cleanRoute === '/'
    ? path.join(distDir, 'index.html')
    : path.join(distDir, cleanRoute.replace(/^\//, ''), 'index.html');

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, renderRoute(cleanRoute), 'utf-8');
});
