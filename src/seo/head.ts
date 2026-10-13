import { languagePath, translations, type Language } from '../i18n/translations';
import { links, person, SITE_URL } from '../data/site';

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ogLocale: Record<Language, string> = { fr: 'fr_FR', en: 'en_US' };

export const pageUrl = (lang: Language) => SITE_URL + languagePath[lang];

function structuredData(lang: Language) {
  const t = translations[lang];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: person.fullName,
        givenName: person.firstName,
        familyName: person.lastName,
        jobTitle: t['seo.jobTitle'],
        description: t['seo.description'],
        url: pageUrl(lang),
        image: `${SITE_URL}/og-image.png`,
        email: `mailto:${person.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: person.city,
          addressCountry: 'FR',
        },
        worksFor: { '@type': 'Organization', name: 'Akkodis', url: 'https://www.akkodis.com' },
        affiliation: { '@type': 'Organization', name: 'Saft', url: 'https://www.saft.com' },
        alumniOf: [
          { '@type': 'CollegeOrUniversity', name: 'Polytech Nancy' },
          { '@type': 'CollegeOrUniversity', name: 'IUT de Blois' },
        ],
        knowsLanguage: ['fr', 'en'],
        knowsAbout: [
          'IT project management',
          'Manufacturing Execution System (MES)',
          'Operational technology (OT)',
          'Software architecture',
          'Data modeling',
          'Linux',
          'Docker',
          'Network security',
          'Machine vision',
          'Artificial intelligence',
          'Python',
          'Rust',
          'Flutter',
          'Ignition',
          'Cybersecurity',
        ],
        sameAs: [links.linkedin, links.github],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL + '/',
        name: `${person.fullName} | Portfolio`,
        inLanguage: ['fr-FR', 'en-US'],
        author: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'ProfilePage',
        url: pageUrl(lang),
        name: t['seo.title'],
        inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
        mainEntity: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  };
}

/** Everything that goes into <head> for a prerendered page. */
export function renderHead(lang: Language, page: 'home' | 'not-found'): string {
  const t = translations[lang];

  if (page === 'not-found') {
    return [
      `<title>${escape(t['seo.notFoundTitle'])}</title>`,
      `<meta name="description" content="${escape(t['seo.description'])}" />`,
      `<meta name="robots" content="noindex" />`,
    ].join('\n    ');
  }

  const url = pageUrl(lang);
  const image = `${SITE_URL}/og-image.png`;
  const other: Language = lang === 'fr' ? 'en' : 'fr';

  return [
    `<title>${escape(t['seo.title'])}</title>`,
    `<meta name="description" content="${escape(t['seo.description'])}" />`,
    `<meta name="author" content="${person.fullName}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="fr" href="${pageUrl('fr')}" />`,
    `<link rel="alternate" hreflang="en" href="${pageUrl('en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('fr')}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${person.fullName}" />`,
    `<meta property="og:title" content="${escape(t['seo.title'])}" />`,
    `<meta property="og:description" content="${escape(t['seo.description'])}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(`${person.fullName}: ${t['seo.jobTitle']}`)}" />`,
    `<meta property="og:locale" content="${ogLocale[lang]}" />`,
    `<meta property="og:locale:alternate" content="${ogLocale[other]}" />`,
    `<meta property="profile:first_name" content="${person.firstName}" />`,
    `<meta property="profile:last_name" content="${person.lastName}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(t['seo.title'])}" />`,
    `<meta name="twitter:description" content="${escape(t['seo.description'])}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(lang)).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}
