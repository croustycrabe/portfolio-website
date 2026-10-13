import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App, { type Page } from './App';
import type { Language } from './i18n/translations';
import { renderHead } from './seo/head';

export { SITE_URL } from './data/site';

/** Used at build time by scripts/prerender.js to produce static, crawlable HTML. */
export function render(language: Language, page: Page) {
  const html = renderToString(
    <StrictMode>
      <App language={language} page={page} />
    </StrictMode>,
  );
  return { html, head: renderHead(language, page) };
}
