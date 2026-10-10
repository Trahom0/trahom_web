import { renderToString } from 'react-dom/server';
import App from './app/App';
import { content, setContentLanguage } from './content';
import { buildSeoTags, getTextDirection } from './app/seo';
import { getPathForPage, getRouteFromPath } from './app/routes';

export type RenderResult = {
  html: string;
  head: string;
  htmlLang: string;
  htmlDir: 'rtl' | 'ltr';
};

export const render = (url: string, origin = ''): RenderResult => {
  const { page, language } = getRouteFromPath(url);
  setContentLanguage(language);
  const html = renderToString(<App initialPath={url} />);
  const seo = buildSeoTags({ page, seo: content.seo, path: getPathForPage(page, language), origin });

  return {
    html,
    head: seo.tags,
    htmlLang: seo.htmlLang,
    htmlDir: getTextDirection(seo.htmlLang)
  };
};
