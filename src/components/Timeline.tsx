import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { BriefcaseIcon, GraduationCapIcon, MapPinIcon, TrophyIcon, UsersThreeIcon, type Icon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { journey, type JourneyType } from '../data/content';
import { Chip, SectionHeading } from './primitives';
import JourneyIllustration from '../assets/illustrations/journey.svg?react';

const typeIcon: Record<JourneyType, Icon> = {
  work: BriefcaseIcon,
  education: GraduationCapIcon,
  extra: UsersThreeIcon,
};

const filters = ['all', 'work', 'education', 'extra'] as const;
type Filter = (typeof filters)[number];

export function Timeline() {
  const { l, t } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const items = journey.filter((item) => filter === 'all' || item.type === filter);

  return (
    <section id="journey" className="relative px-4 py-24 md:py-32" aria-labelledby="journey-title">
      {/* Grid on the outer edges only, fading towards the content */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 mask-[linear-gradient(to_right,black,transparent_22%,transparent_78%,black)]"
      />
      <div className="relative mx-auto max-w-5xl">
        <SectionHeading
          id="journey-title"
          index="01"
          label={t('journey.label')}
          title={t('journey.title')}
          subtitle={t('journey.subtitle')}
          Illustration={JourneyIllustration}
        />
        <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label={t('journey.title')}>
          {filters.map((f) => (
            <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
              {t(`journey.filter.${f}`)}
            </Chip>
          ))}
        </div>

        <div className="relative">
          {/* Track + scroll-driven fill */}
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-6 w-1 -translate-x-1/2 bg-ink/10 md:left-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale }}
            className="absolute top-0 bottom-0 left-6 w-1 origin-top -translate-x-1/2 bg-primary md:left-1/2"
          />

          <ol ref={listRef} className="relative space-y-10">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item, index) => {
                const Icon = typeIcon[item.type];
                const left = index % 2 === 0;
                const year = l(item.period).match(/\d{4}/)?.[0];
                return (
                  <motion.li
                    layout
                    key={l(item.title)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative md:grid md:grid-cols-2 md:gap-16"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-4 left-6 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-brutal-sm border-2 border-ink bg-primary text-primary-fg shadow-brutal-md md:left-1/2"
                    >
                      <Icon size={24} weight="bold" />
                    </motion.div>

                    {/* Large outlined year in the empty half of the row (desktop) */}
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0, x: left ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className={`hidden select-none pt-2 md:row-start-1 md:flex md:flex-col ${
                        left ? 'md:col-start-2 md:items-start' : 'md:col-start-1 md:items-end'
                      }`}
                    >
                      <span className="font-display text-8xl leading-none text-transparent [-webkit-text-stroke:2px_rgb(27_33_37/0.18)] lg:text-9xl">
                        {year}
                      </span>
                      <span className={`mt-3 flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-ink/35 uppercase ${left ? '' : 'flex-row-reverse'}`}>
                        <span className="h-0.5 w-10 bg-ink/25" />
                        {item.organization}
                      </span>
                    </motion.div>

                    <motion.article
                      initial={{ opacity: 0, x: left ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`ml-16 rounded-brutal-md border-2 border-ink bg-surface p-6 shadow-brutal-lg md:row-start-1 md:ml-0 ${
                        left ? 'md:col-start-1' : 'md:col-start-2'
                      }`}
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-brutal-sm border-2 border-ink bg-ink px-2 py-0.5 text-xs font-bold text-cream">
                          {l(item.period)}
                        </span>
                        <span className="text-xs tracking-wider text-muted-fg uppercase">
                          {t(`journey.filter.${item.type}`)}
                        </span>
                      </div>
                      <h3 className="text-lg leading-snug md:text-xl">{l(item.title)}</h3>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                        <span className="font-bold text-primary">{item.organization}</span>
                        <span className="inline-flex items-center gap-1 text-muted-fg">
                          <MapPinIcon size={14} weight="bold" />
                          {l(item.location)}
                        </span>
                      </p>
                      <ul className="mt-4 space-y-1.5 text-sm text-fg/80">
                        {item.bullets.map((b) => (
                          <li key={l(b)} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-primary" />
                            {l(b)}
                          </li>
                        ))}
                      </ul>
                      {item.highlight && (
                        <p className="mt-4 inline-flex items-center gap-2 rounded-brutal-sm border-2 border-ink bg-surface-2 px-3 py-1 text-sm font-bold">
                          <TrophyIcon size={16} weight="fill" className="text-primary" />
                          {l(item.highlight)}
                        </p>
                      )}
                    </motion.article>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </section>
  );
}
