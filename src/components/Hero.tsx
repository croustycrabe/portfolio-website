import { motion } from 'motion/react';
import { ArrowDownIcon, DownloadSimpleIcon, MapPinIcon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { Bracketed, ButtonLink } from './primitives';
import HeroIllustration from '../assets/illustrations/hero.svg?react';
import cvFr from '../assets/files/cv_auguste_lacheteau_fr.pdf';
import cvEn from '../assets/files/cv_auguste_lacheteau_en.pdf';

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedWord({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="block overflow-hidden whitespace-nowrap pb-[0.08em]">
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '105%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/** Registration mark, as found in the corners of technical drawings. */
function CropMark({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`absolute size-6 text-ink/40 ${className}`}>
      <path d="M12 0v24M0 12h24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Hero() {
  const { language, t } = useI18n();

  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden border-b-2 border-ink px-4 pt-28 pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <CropMark className="top-24 left-6 hidden md:block" />
      <CropMark className="right-6 bottom-6 hidden md:block" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: introduction */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-brutal-sm border-2 border-ink bg-surface px-3.5 py-1.5 text-xs font-medium shadow-brutal-sm sm:text-sm"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
            </span>
            {t('hero.status')}
          </motion.p>

          <h1 className="text-[clamp(2.75rem,7.2vw,6rem)] leading-[0.95] tracking-tight">
            <AnimatedWord word="Auguste" delay={0.1} />
            <AnimatedWord word="Lacheteau" delay={0.3} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease }}
          >
            <p className="mt-7 inline-block rounded-brutal-sm border-2 border-ink bg-primary px-3 py-1.5 font-bold text-primary-fg shadow-brutal-md md:text-lg">
              {t('hero.title')}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-fg/80">{t('hero.tagline')}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <ButtonLink href="#journey">
                {t('hero.cta.journey')}
                <ArrowDownIcon size={18} weight="bold" />
              </ButtonLink>
              <ButtonLink href={language === 'fr' ? cvFr : cvEn} target="_blank" rel="noopener" variant="outline">
                <DownloadSimpleIcon size={18} weight="bold" />
                {t('hero.cv')}
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        {/* Right: about card, on top of a solid brick block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="relative mr-4 w-[calc(100%-1rem)] max-w-md sm:mx-auto md:mr-auto"
        >
          <div
            aria-hidden="true"
            className="bg-grid-light absolute inset-0 translate-x-4 translate-y-4 rounded-brutal-lg border-2 border-ink bg-primary md:translate-x-5 md:translate-y-5"
          />

          <article className="relative overflow-hidden rounded-brutal-lg border-2 border-ink bg-surface" aria-labelledby="about-title">
            <div className="flex items-center gap-1.5 border-b-2 border-ink bg-surface-2 px-4 py-2.5" aria-hidden="true">
              <span className="size-3 rounded-full border-2 border-ink bg-primary" />
              <span className="size-3 rounded-full border-2 border-ink bg-cream" />
              <span className="size-3 rounded-full border-2 border-ink bg-slate" />
              <span className="ml-auto text-xs text-muted-fg">about.md</span>
            </div>

            <div className="bg-hatch border-b-2 border-ink px-8 pt-6">
              <HeroIllustration aria-hidden="true" className="mx-auto h-44 w-auto" />
            </div>

            <div className="space-y-5 p-7">
              <h2 id="about-title" className="text-xl">
                <Bracketed>{t('about.title')}</Bracketed>
              </h2>
              <p className="text-sm leading-relaxed text-fg/80">{t('about.description')}</p>
              <p className="flex items-center gap-1.5 border-t-2 border-ink/10 pt-4 text-sm text-muted-fg">
                <MapPinIcon size={18} weight="bold" className="text-primary" />
                {t('about.location')}
              </p>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
