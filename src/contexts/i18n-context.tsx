import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { languagePath, translations, type Language, type Localized, type TranslationKey } from '../i18n/translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  /** Pick the current language from a `{ fr, en }` value. */
  l: (value: Localized) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function languageFromPath(pathname: string): Language {
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'fr';
}

export function I18nProvider({ initialLanguage, children }: { initialLanguage: Language; children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Each language lives at its own URL (/ and /en/) so both versions get indexed.
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (window.location.pathname !== languagePath[lang]) {
      window.history.pushState(null, '', languagePath[lang] + window.location.hash);
    }
  }, []);

  useEffect(() => {
    const onPop = () => setLanguageState(languageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextType>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key],
      l: (v) => v[language],
    }),
    [language, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
