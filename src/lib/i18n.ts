export const locales = ['es', 'en', 'fr', 'pt', 'el', 'hi', 'it', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split('/');
  return maybeLocale && isLocale(maybeLocale) ? maybeLocale : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const locale = getLocaleFromPathname(pathname);

  if (!locale) {
    return pathname || '/';
  }

  const strippedPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), '');
  return strippedPath || '/';
}

export function getPathnameForLocale(pathname: string, locale: Locale): string {
  const basePath = stripLocaleFromPathname(pathname);

  if (locale === defaultLocale) {
    return basePath;
  }

  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}
