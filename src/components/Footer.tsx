import { ArrowUpIcon, EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { links, person } from '../data/site';
import { languagePath, type TranslationKey } from '../i18n/translations';
import { CrabLogo } from './CrabLogo';

const nav: { href: string; key: TranslationKey }[] = [
  { href: '#journey', key: 'nav.journey' },
  { href: '#skills', key: 'nav.skills' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#contact', key: 'nav.contact' },
];

const socialClass =
  'press press-sm grid size-11 place-items-center rounded-brutal-sm border-2 border-cream text-cream [--press-color:var(--cream)] hover:bg-slate-1';

export function Footer() {
  const { language, t } = useI18n();

  return (
    <footer className="border-t-2 border-ink bg-ink px-4 pt-14 pb-8 text-cream">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-5">
              <CrabLogo variant="mono" aria-hidden="true" className="w-14 text-cream" />
              <p className="font-display text-lg">
                <span className="text-brick-light">[</span> {person.fullName} <span className="text-brick-light">]</span>
              </p>
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/70">{t('hero.title')}</p>
            <p className="mt-1 max-w-xs text-sm text-cream/50">{t('footer.tagline')}</p>
          </div>

          <nav aria-label={t('footer.nav')}>
            <h2 className="mb-4 font-mono font-bold">{t('footer.nav')}</h2>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={languagePath[language] + n.href} className="text-cream/70 transition-colors hover:text-cream hover:underline">
                    {t(n.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-mono font-bold">{t('contact.social')}</h2>
            <div className="flex gap-3">
              <a href={links.github} target="_blank" rel="noopener noreferrer me" aria-label="GitHub" className={socialClass}>
                <GithubLogoIcon size={22} weight="bold" />
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer me" aria-label="LinkedIn" className={socialClass}>
                <LinkedinLogoIcon size={22} weight="bold" />
              </a>
              <a href={`mailto:${person.email}`} aria-label="Email" className={socialClass}>
                <EnvelopeSimpleIcon size={22} weight="bold" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-cream/15 pt-6 text-sm text-cream/60">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {person.fullName}. {t('footer.rights')}
          </p>
          <a href="#home" className={socialClass} aria-label={t('a11y.backToTop')}>
            <ArrowUpIcon size={20} weight="bold" />
          </a>
        </div>
      </div>
    </footer>
  );
}
