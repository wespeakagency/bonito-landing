import Script from 'next/script';
import {
  DATA_LAYER_NAME,
  GA_FALLBACK_ENABLED,
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
  GTM_ENABLED,
} from '@/config/analytics';

export function AnalyticsHeadScripts() {
  if (GTM_ENABLED) {
    return (
      <>
        <Script id="gtm-data-layer" strategy="beforeInteractive">
          {`window.${DATA_LAYER_NAME} = window.${DATA_LAYER_NAME} || [];`}
        </Script>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','${DATA_LAYER_NAME}','${GTM_CONTAINER_ID}');
          `}
        </Script>
      </>
    );
  }

  if (GA_FALLBACK_ENABLED) {
    return (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.${DATA_LAYER_NAME} = window.${DATA_LAYER_NAME} || [];
            function gtag(){${DATA_LAYER_NAME}.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </>
    );
  }

  return null;
}

export function AnalyticsBodyStart() {
  if (!GTM_ENABLED) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
