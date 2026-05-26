import en from '@/i18n/en.json';
import es from '@/i18n/es.json';
import fr from '@/i18n/fr.json';
import pt from '@/i18n/pt.json';
import el from '@/i18n/el.json';
import hi from '@/i18n/hi.json';
import it from '@/i18n/it.json';
import zh from '@/i18n/zh.json';
import { defaultLocale, type Locale } from '@/lib/i18n';

export type Translations = typeof es;

export const allTranslations: Record<Locale, Translations> = { en, es, fr, pt, el, hi, it, zh };

export function getTranslations(locale: Locale): Translations {
  return allTranslations[locale] ?? allTranslations[defaultLocale];
}
