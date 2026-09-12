'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export function LanguageToggle() {
  const { locale, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-starlight/70 transition-all hover:border-nebula-light/40 hover:bg-nebula/10 hover:text-starlight"
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <Languages className="h-3.5 w-3.5 text-nebula-glow" />
      <span>{locale === 'en' ? t('language.arabic') : t('language.english')}</span>
    </button>
  );
}
