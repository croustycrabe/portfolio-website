import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { I18nProvider, useI18n } from './contexts/i18n-context';
import type { Language } from './i18n/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';

export type Page = 'home' | 'not-found';

function AppContent({ page }: { page: Page }) {
  const { t } = useI18n();

  useEffect(() => {
    document.title = page === 'home' ? t('seo.title') : t('seo.notFoundTitle');
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('seo.description'));
  }, [page, t]);

  return (
    <>
      <Header />
      <main id="main">
        {page === 'home' ? (
          <>
            <Hero />
            <Timeline />
            <Skills />
            <Projects />
            <Contact />
          </>
        ) : (
          <NotFound />
        )}
      </main>
      <Footer />
    </>
  );
}

export default function App({ language, page }: { language: Language; page: Page }) {
  return (
    <I18nProvider initialLanguage={language}>
      {/* Honour the OS "reduce motion" setting for every animation. */}
      <MotionConfig reducedMotion="user">
        <AppContent page={page} />
      </MotionConfig>
    </I18nProvider>
  );
}
