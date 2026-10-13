// Single source of truth for personal info & links (used by UI, SEO and JSON-LD).

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://augustelacheteau.dev'
).replace(/\/+$/, '');

export const person = {
  firstName: 'Auguste',
  lastName: 'Lacheteau',
  fullName: 'Auguste Lacheteau',
  email: 'lacheteaua@gmail.com',
  phone: '+33769082527',
  phoneDisplay: '+33 7 69 08 25 27',
  city: 'Poitiers',
  country: 'France',
};

export const links = {
  github: 'https://github.com/avagst3',
  linkedin: 'https://www.linkedin.com/in/auguste-lacheteau-790419239',
};
