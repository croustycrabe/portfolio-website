import { motion } from 'motion/react';
import { HouseIcon } from '@phosphor-icons/react';
import { useI18n } from '../contexts/i18n-context';
import { languagePath } from '../i18n/translations';
import { Bracketed, ButtonLink } from './primitives';
import NotFoundIllustration from '../assets/illustrations/not-found.svg?react';

export function NotFound() {
  const { language, t } = useI18n();
  return (
    <section className="flex min-h-svh items-center justify-center px-4 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl rounded-brutal-lg border-2 border-ink bg-surface p-8 text-center shadow-brutal-xl"
      >
        <NotFoundIllustration aria-hidden="true" className="mx-auto h-48 w-auto" />
        <h1 className="mt-6 text-3xl">
          <Bracketed>{t('notFound.title')}</Bracketed>
        </h1>
        <p className="mt-4 text-fg/75">{t('notFound.text')}</p>
        <ButtonLink href={languagePath[language]} className="mt-8">
          <HouseIcon size={18} weight="bold" />
          {t('notFound.cta')}
        </ButtonLink>
      </motion.div>
    </section>
  );
}
