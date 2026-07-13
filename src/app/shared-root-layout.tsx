import {
  AnalyticsBodyStart,
  AnalyticsHeadScripts,
} from '@/features/analytics/components/google-analytics-script';

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
        <AnalyticsHeadScripts />
      </head>
      <body className="font-body antialiased">
        <AnalyticsBodyStart />
        {children}
      </body>
    </html>
  );
}
