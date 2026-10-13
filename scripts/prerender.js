// Turns the client build into static, crawlable HTML pages:
//   dist/index.html (fr), dist/en/index.html (en), dist/404.html
// plus sitemap.xml and robots.txt pointing at SITE_URL.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const { render, SITE_URL } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

const pages = [
  { file: 'index.html', lang: 'fr', page: 'home' },
  { file: 'en/index.html', lang: 'en', page: 'home' },
  { file: '404.html', lang: 'fr', page: 'not-found' },
];

for (const { file, lang, page } of pages) {
  const { html, head } = render(lang, page);
  const out = template
    .replace('<html lang="fr"', `<html lang="${lang}"`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);
  const target = resolve(dist, file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, out);
  console.log(`prerendered /${file}`);
}

const today = new Date().toISOString().slice(0, 10);
const alternates = `
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE_URL}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/"/>`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>${alternates}
  </url>
  <url>
    <loc>${SITE_URL}/en/</loc>
    <lastmod>${today}</lastmod>${alternates}
  </url>
</urlset>
`;
await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`sitemap.xml + robots.txt written for ${SITE_URL}`);

// The SSR bundle is only a build tool, never deployed.
await rm(ssrDir, { recursive: true, force: true });
