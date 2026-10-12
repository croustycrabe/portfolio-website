# Auguste Lacheteau · Portfolio

Personal portfolio in the CroustyLab neo-brutalist style (Rubik One + Roboto Mono, brick / cream / ink palette).

**Stack:** React 19 · Vite · Tailwind CSS v4 · Motion · Phosphor Icons · unDraw illustrations

## Scripts

| Command             | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Dev server on http://localhost:5173                                 |
| `npm run build`     | Typecheck, build, then prerender static HTML into `dist/`           |
| `npm run preview`   | Serve the production build locally                                  |

## How it's organised

- `src/data/site.ts`: name, email, phone, social links, site URL
- `src/data/content.ts`: timeline, skills, projects (FR/EN)
- `src/i18n/translations.ts`: all UI text (FR/EN)
- `src/assets/illustrations/`: unDraw SVGs, recoloured through CSS variables (`--ill-*`) so they follow light/dark theme
- `src/seo/head.ts`: title, meta, canonical, hreflang, Open Graph, JSON-LD

## SEO

`npm run build` prerenders real HTML for each page, so crawlers don't need JavaScript:

- `/` (French, default) and `/en/` (English), linked with `hreflang`
- `/404.html` (`noindex`, served with a real 404 status by nginx)
- `sitemap.xml` and `robots.txt`

The public URL comes from `VITE_SITE_URL` (default `https://portfolio-auguste-lacheteau.vercel.app`):

```sh
VITE_SITE_URL=https://my-domain.fr npm run build
```

## Docker

```sh
docker build -t portfolio --build-arg SITE_URL=https://my-domain.fr .
docker run -d -p 8080:8080 --name portfolio portfolio
```

The image is a multi-stage build: Node builds the site, then unprivileged nginx serves it on port **8080**.
nginx handles gzip, immutable caching for `/assets/`, security headers and the 404 page (see `docker/`).
