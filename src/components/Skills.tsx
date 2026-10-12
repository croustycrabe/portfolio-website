import { motion } from 'motion/react';
import { BicycleIcon, FlagIcon, TranslateIcon, type Icon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { skillGroups } from '../data/content';
import type { TranslationKey } from '../i18n/translations';
import { Bracketed, Reveal, SectionHeading } from './primitives';
import SkillsIllustration from '../assets/illustrations/skills.svg?react';

const levels = [1, 2, 3, 4, 5] as const;

function LevelBar({ level, animate = true }: { level: number; animate?: boolean }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {levels.map((i) => (
        <span key={i} className="relative h-3.5 w-3.5 overflow-hidden rounded-[3px] border-2 border-ink bg-surface-2">
          {i <= level && (
            <motion.span
              className="absolute inset-0 origin-left bg-primary"
              initial={animate ? { scaleX: 0 } : false}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: 0.15 + i * 0.08 }}
            />
          )}
        </span>
      ))}
    </span>
  );
}

const beyond: { icon: Icon; title: TranslationKey; items: TranslationKey[] }[] = [
  { icon: TranslateIcon, title: 'skills.beyond.languages', items: ['skills.beyond.languages.1', 'skills.beyond.languages.2'] },
  { icon: FlagIcon, title: 'skills.beyond.ctf', items: ['skills.beyond.ctf.1', 'skills.beyond.ctf.2'] },
  { icon: BicycleIcon, title: 'skills.beyond.sport', items: ['skills.beyond.sport.1', 'skills.beyond.sport.2'] },
];

export function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="relative border-b-2 border-ink bg-primary px-4 py-24 md:py-32" aria-labelledby="skills-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills-title"
          index="02"
          label={t('skills.label')}
          tone="primary"
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
          Illustration={SkillsIllustration}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* Level scale */}
          <Reveal className="h-fit rounded-brutal-lg border-2 border-ink bg-surface p-6 shadow-brutal-xl lg:sticky lg:top-28">
            <h3 className="mb-5 text-lg">
              <Bracketed>{t('skills.matrix')}</Bracketed>
            </h3>
            <ol className="space-y-4">
              {levels.map((level) => (
                <li key={level}>
                  <div className="flex items-center gap-3">
                    <LevelBar level={level} animate={false} />
                    <span className="text-sm font-bold">{t(`skills.level.${level}`)}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-fg">{t(`skills.level.${level}.desc`)}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Skill groups */}
          <div className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map((group, gi) => (
              <Reveal
                key={group.key}
                delay={gi * 0.08}
                className="overflow-hidden rounded-brutal-lg border-2 border-ink bg-surface shadow-brutal-xl"
              >
                <h3 className="border-b-2 border-ink bg-ink px-5 py-3 font-mono font-bold text-cream">{t(group.key)}</h3>
                <ul className="divide-y-2 divide-ink/10 px-5 py-2">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-4 py-2.5">
                      <span className="font-medium">{skill.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="sr-only">
                          {t(`skills.level.${skill.level}`)} ({skill.level}/5)
                        </span>
                        <LevelBar level={skill.level} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Beyond code */}
        <h3 className="mt-20 mb-8 text-2xl text-cream">
          <Bracketed bracketClass="text-ink">{t('skills.beyond')}</Bracketed>
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {beyond.map(({ icon: Icon, title, items }, i) => (
            <Reveal
              key={title}
              delay={i * 0.1}
              className="flex gap-4 rounded-brutal-md border-2 border-ink bg-surface p-5 shadow-brutal-xl"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-brutal-sm border-2 border-ink bg-primary text-primary-fg">
                <Icon size={24} weight="bold" />
              </span>
              <div>
                <h4 className="font-bold">{t(title)}</h4>
                <ul className="mt-1 space-y-0.5 text-sm text-fg/75">
                  {items.map((k) => (
                    <li key={k}>{t(k)}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
