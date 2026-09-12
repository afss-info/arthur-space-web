'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Locale } from '@/lib/i18n';

type LanguageContextValue = {
  locale: Locale;
  isArabic: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('afss-locale');
    if (saved === 'ar' || saved === 'en') setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem('afss-locale', locale);
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    isArabic: locale === 'ar',
    toggleLanguage: () => setLocale((current) => current === 'en' ? 'ar' : 'en'),
    t: (key: string) => translations[locale][key] ?? translations.en[key] ?? key,
  }), [locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
