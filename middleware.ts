import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const normalizedPath = pathname.replace(new RegExp(`^/${defaultLocale}(?=/|$)`), '') || '/';
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = normalizedPath;

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)'],
};
