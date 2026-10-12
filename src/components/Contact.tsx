import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  type Icon,
} from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { links, person } from '../data/site';
import { ButtonLink, Reveal, SectionHeading } from './primitives';
import ContactIllustration from '../assets/illustrations/contact.svg?react';

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: Icon;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer me' } : {})}
      className="press group flex items-center gap-4 rounded-brutal-md border-2 border-ink bg-surface p-4 hover:bg-cream"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-brutal-sm border-2 border-ink bg-ink text-cream">
        <Icon size={22} weight="bold" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-fg">{label}</span>
        <span className="block truncate font-bold">{value}</span>
      </span>
      <ArrowUpRightIcon size={20} weight="bold" className="shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function Contact() {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  return (
    <section id="contact" className="relative px-4 py-24 md:py-32" aria-labelledby="contact-title">
      {/* Diagonal hatching fading out towards the footer */}
      <div aria-hidden="true" className="bg-hatch pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="contact-title"
          index="04"
          label={t('contact.label')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <Reveal className="grid overflow-hidden rounded-brutal-lg border-2 border-ink bg-primary shadow-brutal-xl lg:grid-cols-[1.1fr_1fr]">
          {/* Call to action */}
          <div className="flex flex-col justify-between gap-10 border-b-2 border-ink p-6 text-cream sm:p-8 md:p-12 lg:border-r-2 lg:border-b-0">
            <div>
              <p className="font-display text-2xl leading-tight sm:text-3xl md:text-4xl">{t('contact.pitch')}</p>
              <p className="mt-5 max-w-md leading-relaxed text-cream/85">{t('contact.pitchText')}</p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={`mailto:${person.email}`} variant="cream">
                  <PaperPlaneTiltIcon size={20} weight="bold" />
                  {t('contact.cta')}
                </ButtonLink>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={t('contact.copy')}
                  title={t('contact.copy')}
                  className="press relative grid size-12.5 place-items-center rounded-brutal-sm border-2 border-ink bg-cream text-ink hover:bg-surface"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'ok' : 'copy'}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? <CheckIcon size={20} weight="bold" /> : <CopyIcon size={20} weight="bold" />}
                    </motion.span>
                  </AnimatePresence>
                  <span role="status" className="sr-only">
                    {copied ? t('contact.copied') : ''}
                  </span>
                </button>
              </div>
              <div className="hidden w-40 rounded-brutal-md border-2 border-ink bg-surface p-3 sm:block">
                <ContactIllustration aria-hidden="true" className="w-full" />
              </div>
            </div>
          </div>

          {/* Channels */}
          <div className="flex flex-col justify-center gap-5 p-6 sm:p-8 md:p-12">
            <ContactCard href={`mailto:${person.email}`} icon={EnvelopeSimpleIcon} label={t('contact.email')} value={person.email} />
            <ContactCard href={`tel:${person.phone}`} icon={PhoneIcon} label={t('contact.phone')} value={person.phoneDisplay} />
            <ContactCard href={links.linkedin} icon={LinkedinLogoIcon} label="LinkedIn" value={person.fullName} external />
            <ContactCard href={links.github} icon={GithubLogoIcon} label="GitHub" value={links.github.replace('https://', '')} external />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
