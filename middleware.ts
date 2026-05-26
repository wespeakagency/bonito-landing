import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr', 'pt', 'el', 'hi', 'it', 'zh'];
const defaultLocale = 'es';

function getLocale(request: NextRequest): string {
  // Aquí podrías añadir lógica para detectar el idioma del navegador, etc.
  // Por ahora, lo mantenemos simple.
  const pathLocale = request.nextUrl.pathname.split('/')[1];
  if (locales.includes(pathLocale)) {
    return pathLocale;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Evitar redirecciones para assets y rutas de la API
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.includes('.') // asssume that files with extensions are assets
  ) {
    return;
  }

  const pathnameHasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirigir a la ruta con el idioma por defecto
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /es/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher para que el middleware no se ejecute en rutas de la API, etc.
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/',
  ],
};
