import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { languagePath, type Language, type TranslationKey } from '../i18n/translations';
import { CrabLogo } from './CrabLogo';
import { person } from '../data/site';

const sections: { id: string; key: TranslationKey }[] = [
  { id: 'journey', key: 'nav.journey' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'contact', key: 'nav.contact' },
];

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of ['home', ...sections.map((s) => s.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Header() {
  const { language, setLanguage, t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const active = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLanguage = (lang: Language) => (e: React.MouseEvent) => {
    e.preventDefault();
    setLanguage(lang);
  };

  const solid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b-2 border-ink bg-cream/95 backdrop-blur-md' : 'border-b-2 border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-brutal-sm focus:border-2 focus:border-ink focus:bg-surface focus:px-4 focus:py-2"
      >
        {t('a11y.skip')}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Inline lockup: gap = 1/3 of the logo width (brand guideline) */}
        <a href={languagePath[language]} className="group flex items-center gap-5" aria-label={t('a11y.home')}>
          <CrabLogo aria-hidden="true" className="w-14 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="hidden font-display text-sm lg:inline" aria-hidden="true">
            <span className="text-primary">[</span> {person.fullName} <span className="text-primary">]</span>
          </span>
        </a>

        <nav className="hidden md:block" aria-label="Navigation">
          <ul className="flex items-center gap-1">
            {sections.map((s) => (
              <li key={s.id} className="relative">
                <a
                  href={`${languagePath[language]}#${s.id}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  className={`relative z-10 block rounded-brutal-sm px-3 py-1.5 text-sm font-medium transition-colors ${
                    active === s.id ? 'text-primary-fg' : 'text-fg/75 hover:text-fg'
                  }`}
                >
                  {t(s.key)}
                </a>
                {active === s.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-brutal-sm border-2 border-ink bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex overflow-hidden rounded-brutal-sm border-2 border-ink text-xs font-bold shadow-brutal-sm"
            role="group"
            aria-label={t('a11y.language')}
          >
            {(['fr', 'en'] as const).map((lang) => (
              <a
                key={lang}
                href={languagePath[lang]}
                hrefLang={lang}
                onClick={switchLanguage(lang)}
                aria-current={language === lang ? 'true' : undefined}
                className={`px-2.5 py-1.5 uppercase transition-colors ${
                  language === lang ? 'bg-ink text-cream' : 'bg-surface text-fg hover:bg-surface-2'
                }`}
              >
                {lang}
              </a>
            ))}
          </div>


          <button
            type="button"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label={isMenuOpen ? t('a11y.closeMenu') : t('a11y.menu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            className="press press-sm grid size-9 place-items-center rounded-brutal-sm border-2 border-ink bg-surface md:hidden"
          >
            {isMenuOpen ? <XIcon size={18} weight="bold" /> : <ListIcon size={18} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-2 px-4 pb-5 pt-1">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={`${languagePath[language]}#${s.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="press press-sm block rounded-brutal-sm border-2 border-ink bg-surface px-4 py-2.5 font-display text-lg"
                  >
                    <span className="text-primary">0{i + 1}.</span> {t(s.key)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-0.5 h-1 origin-left bg-primary"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
