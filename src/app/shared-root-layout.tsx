import Script from 'next/script';

interface SharedRootLayoutProps {
  children: React.ReactNode;
  lang: string;
}

export function SharedRootLayout({ children, lang }: SharedRootLayoutProps) {
  return (
    <html lang={lang} className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
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
