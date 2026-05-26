'use client';

import React, { createContext, useContext, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import en from '@/i18n/en.json';
import es from '@/i18n/es.json';
import fr from '@/i18n/fr.json';
import pt from '@/i18n/pt.json';
import el from '@/i18n/el.json';
import hi from '@/i18n/hi.json';
import it from '@/i18n/it.json';
import zh from '@/i18n/zh.json';

export type Locale = 'en' | 'es' | 'fr' | 'pt' | 'el' | 'hi' | 'it' | 'zh';

type Translations = typeof es; // Assume all translation files have the same structure

const allTranslations: Record<Locale, Translations> = { en, es, fr, pt, el, hi, it, zh };

interface LanguageContextType {
  locale: Locale;
  translations: Translations;
  changeLanguage: (newLocale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLocale: Locale }> = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale || 'es');
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale !== locale) {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      setLocale(newLocale);
      router.push(newPath);
    }
  };

  // Fallback to Spanish if translations for the current locale are not found.
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