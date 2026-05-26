'use client';

import React, { createContext, useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';
import fr from '@/i18n/fr.json';
import pt from '@/i18n/pt.json';
import el from '@/i18n/el.json';
import hi from '@/i18n/hi.json';
import it from '@/i18n/it.json';
import zh from '@/i18n/zh.json';
import { defaultLocale, getLocaleFromPathname, getPathnameForLocale, type Locale } from '@/lib/i18n';

type Translations = typeof es;

const allTranslations: Record<Locale, Translations> = { en, es, fr, pt, el, hi, it, zh };

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
      const nextPath = getPathnameForLocale(pathname, newLocale);
      const queryString = searchParams.toString();
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const href = `${nextPath}${queryString ? `?${queryString}` : ''}${hash}`;

      router.push(href);
    }
  };

  const translations = allTranslations[locale] || allTranslations.es;

  return (
    <LanguageContext.Provider value={{ locale, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export type { Locale };
