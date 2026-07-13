'use client';

import React, { createContext, useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { defaultLocale, getLocaleFromPathname, getPathnameForLocale, type Locale } from '@/lib/i18n';
import { getTranslations, type Translations } from '@/lib/translations';
import { trackLanguageChange } from '@/features/analytics/track';

interface LanguageContextType {
  locale: Locale;
  translations: Translations;
  changeLanguage: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLocale: Locale }> = ({ children, initialLocale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = getLocaleFromPathname(pathname) ?? initialLocale ?? defaultLocale;

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale !== locale) {
      trackLanguageChange(locale, newLocale);

      const nextPath = getPathnameForLocale(pathname, newLocale);
      const queryString = searchParams.toString();
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const href = `${nextPath}${queryString ? `?${queryString}` : ''}${hash}`;

      router.push(href);
    }
  };

  const translations = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useOptionalLanguage = () => useContext(LanguageContext);

export const useLanguage = () => {
  const context = useOptionalLanguage();
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { Locale, Translations };
