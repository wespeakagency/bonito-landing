import type { Metadata } from 'next';
import '../globals.css';
import { notFound, redirect } from 'next/navigation';
import { Providers } from '../providers';
import { SharedRootLayout } from '../shared-root-layout';
import { getMetadataForLocale } from '../site-metadata';
import { LanguageProvider } from '@/context/language-context';
import { defaultLocale, isLocale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return getMetadataForLocale(isLocale(lang) ? lang : defaultLocale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  if (lang === defaultLocale) {
    redirect('/');
  }

  return (
    <SharedRootLayout lang={lang}>
      <Providers>
        <LanguageProvider initialLocale={lang}>
          {children}
        </LanguageProvider>
      </Providers>
    </SharedRootLayout>
  );
}
