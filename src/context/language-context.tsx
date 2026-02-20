'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import es from '@/i18n/es.json';
import en from '@/i18n/en.json';
import zh from '@/i18n/zh.json';
import pt from '@/i18n/pt.json';
import hi from '@/i18n/hi.json';
import fr from '@/i18n/fr.json';
import el from '@/i18n/el.json';

type Locale = 'es' | 'en' | 'zh' | 'pt' | 'hi' | 'fr' | 'el';

type Translations = {
  [key: string]: any;
};

const translations: Record<Locale, Translations> = { es, en, zh, pt, hi, fr, el };

interface LanguageContextType {
  language: Locale;
  setLanguage: (language: Locale) => void;
  t: (key: string, options?: { returnObjects: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>('es');

  const t = (key: string, options?: { returnObjects: boolean }) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to Spanish if key not found in current language
        let fallbackResult = translations['es'];
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
          if (fallbackResult === undefined) {
            console.warn(`Translation key not found in any language: ${key}`);
            return key;
          }
        }
        return fallbackResult;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
