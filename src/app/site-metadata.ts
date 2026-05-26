import type { Metadata } from 'next';
import { defaultLocale, locales, type Locale } from '@/lib/i18n';
import { getTranslations } from '@/lib/translations';

const openGraphLocales: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
  fr: 'fr_FR',
  pt: 'pt_PT',
  el: 'el_GR',
  hi: 'hi_IN',
  it: 'it_IT',
  zh: 'zh_CN',
};

function getCanonicalPath(locale: Locale) {
  return locale === defaultLocale ? '/' : `/${locale}`;
}

export function getMetadataForLocale(locale: Locale = defaultLocale): Metadata {
  const translations = getTranslations(locale);

  return {
    title: translations.metadata.title,
    description: translations.metadata.description,
    alternates: {
      canonical: getCanonicalPath(locale),
      languages: Object.fromEntries(locales.map((currentLocale) => [currentLocale, getCanonicalPath(currentLocale)])),
    },
    icons: {
      icon: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/golondrina.png',
    },
    openGraph: {
      title: translations.metadata.title,
      description: translations.metadata.description,
      locale: openGraphLocales[locale],
      type: 'website',
      siteName: translations.metadata.title,
    },
    twitter: {
      title: translations.metadata.title,
      description: translations.metadata.description,
    },
  };
}
