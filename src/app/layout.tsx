import './globals.css';
import { Providers } from './providers';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Negociando Bonito',
  description: 'Un libro para transformar conversaciones difíciles en acuerdos mutuos.',
  icons: {
    icon: 'https://raw.githubusercontent.com/ryandoelsol/negociandobonito/main/golondrina.png',
  },
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
        <Providers>
          {children}
        </Providers>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-51XL9MEXDK"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-51XL9MEXDK');
          `}
        </Script>
      </body>
    </html>
  );
}
