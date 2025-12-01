'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/language-context';
import SocialLinks from '@/components/social-links';
import CustomCursor from '@/components/custom-cursor';

const metadata: Metadata = {
  title: 'Bonito Landing',
  description: 'Negociar es abrazar con compasión a una persona mientras experimentamos los altibajos de la vida.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <CustomCursor />
        <LanguageProvider>
          <SocialLinks />
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
