import Script from 'next/script';
import {
  DATA_LAYER_NAME,
  GA_FALLBACK_ENABLED,
  GA_MEASUREMENT_ID,
  GTM_CONTAINER_ID,
  GTM_ENABLED,
  META_PIXEL_ENABLED,
  META_PIXEL_ID,
} from '@/config/analytics';

function GoogleHeadScripts() {
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

function MetaPixelHeadScript() {
  if (!META_PIXEL_ENABLED) {
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView', {}, { eventID: (self.crypto && self.crypto.randomUUID) ? self.crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2) });
      `}
    </Script>
  );
}

export function AnalyticsHeadScripts() {
  return (
    <>
      <GoogleHeadScripts />
      <MetaPixelHeadScript />
    </>
  );
}

export function AnalyticsBodyStart() {
  return (
    <>
      {GTM_ENABLED ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      ) : null}
      {META_PIXEL_ENABLED ? (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      ) : null}
    </>
  );
}
