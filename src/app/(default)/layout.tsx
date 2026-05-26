import '../globals.css';
import { Providers } from '../providers';
import { SharedRootLayout } from '../shared-root-layout';
import { siteMetadata } from '../site-metadata';
import { LanguageProvider } from '@/context/language-context';
import { defaultLocale } from '@/lib/i18n';

export const metadata = siteMetadata;

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SharedRootLayout lang={defaultLocale}>
      <Providers>
        <LanguageProvider initialLocale={defaultLocale}>
          {children}
        </LanguageProvider>
      </Providers>
    </SharedRootLayout>
  );
}
