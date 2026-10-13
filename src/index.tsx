import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App, { type Page } from './App';
import { languageFromPath } from './contexts/i18n-context';

const { pathname } = window.location;
const isHome = /^\/(en\/?)?(index\.html)?$/.test(pathname);
const page: Page = isHome ? 'home' : 'not-found';
// The 404 page is prerendered in French, so hydrate it in French too.
const language = isHome ? languageFromPath(pathname) : 'fr';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App language={language} page={page} />
  </StrictMode>
);

// Production pages are prerendered (see scripts/prerender.js): hydrate them.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
