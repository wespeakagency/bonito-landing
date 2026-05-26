'use client';

import { createContext, useContext, type ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import es from '@/i18n/es.json';
import en from '@/i18n/en.json';
import fr from '@/i18n/fr.json';
import pt from '@/i18n/pt.json';
import el from '@/i18n/el.json';
import hi from '@/i18n/hi.json';
import it from '@/i18n/it.json';
import zh from '@/i18n/zh.json';

export type Locale = 'es' | 'en' | 'fr' | 'pt' | 'el' | 'hi' | 'it' | 'zh';

const translations: Record<Locale, any> = { es, en, fr, pt, el, hi, it, zh };

interface LanguageContextType {
  translations: any;
  changeLanguage: (newLocale: Locale) => void;
  locale: Locale;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to get locale from pathname
const getLocaleFromPathname = (pathname: string): Locale => {
  const firstPart = pathname.split('/')[1];
  if (Object.keys(translations).includes(firstPart)) {
    return firstPart as Locale;
  }
  return 'es'; // Default locale
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  
  const changeLanguage = useCallback((newLocale: Locale) => {
    const currentPath = pathname;
    const pathParts = currentPath.split('/');
    if (Object.keys(translations).includes(pathParts[1])) {
        pathParts[1] = newLocale;
        const newPath = pathParts.join('/');
        router.push(newPath);
    } else {
        router.push(`/${newLocale}${currentPath}`);
    }
  }, [pathname, router]);

  const value = {
    translations: translations[locale],
    changeLanguage,
    locale,
  };

  return (
    <LanguageContext.Provider value={value}>
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
