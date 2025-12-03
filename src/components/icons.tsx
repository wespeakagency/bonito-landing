import type { SVGProps } from 'react';

export const EarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 8.5a6.5 6.5 0 1 1 13 0v6a6.5 6.5 0 0 1-6.5 6.5h-1A6.5 6.5 0 0 1 5 14.5v-6Z" />
    <path d="M12 8.5a3 3 0 0 1 3 3v2" />
  </svg>
);

export const BonitoLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 300 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text
      fontFamily="Montserrat, sans-serif"
      fontSize="30"
      fontWeight="700"
      fill="currentColor"
    >
      <tspan x="0" y="25">NEGOCIANDO</tspan>
      <tspan x="0" y="55">BONITO</tspan>
    </text>
  </svg>
);

export const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const TiktokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

export const AppleBooksIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22V8a2.5 2.5 0 0 1 2.5-2.5h1A2.5 2.5 0 0 1 18 8v14" />
    <path d="M12 22a2.5 2.5 0 0 1-2.5-2.5V8a2.5 2.5 0 0 1-2.5-2.5h-1A2.5 2.5 0 0 1 4 8v14" />
    <path d="M12 22a2.5 2.5 0 0 0 2.5-2.5V8a2.5 2.5 0 0 0-2.5-2.5h0A2.5 2.5 0 0 0 9.5 8v11.5A2.5 2.5 0 0 0 12 22Z" />
    <path d="M16 2h-1" />
    <path d="M8 2h1" />
  </svg>
);

export const GooglePlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2.5 2.5l11 11" />
    <path d="m15.5 5.5-3 3-3-3 5.5-3Z" />
    <path d="m5.5 15.5 3-3 3 3-5.5 3Z" />
    <path d="M13.5 13.5L21.5 22" />
    <path d="M13.5 2.5v11" />
    <path d="M21.5 2.5v11" />
  </svg>
);

export const SpainFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" {...props}>
    <path fill="#C60B1E" d="M0 0h3v2H0z"/>
    <path fill="#FFC400" d="M0 .5h3v1H0z"/>
  </svg>
);

export const UKFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
    <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
    <path d="M0 0v30h60V0z" fill="#012169"/>
    <path d="M0 0L60 30m0-30L0 30" stroke="#fff" strokeWidth="6" clipPath="url(#a)"/>
    <path d="M0 0L60 30m0-30L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#a)"/>
    <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
    <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);

export const ChinaFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" {...props}>
    <path fill="#ee1c25" d="M0 0h30v20H0z"/>
    <path fill="#ff0" d="M5 4l-1.545.472L5 4.944l1.545-.472L5 4zm5 .8L8.82 4.4l-1.18 1.18L9.2 6.8l1.18-1.18L8.82 4.4 10 3.2zm2.3 2.3l-1.18 1.18L12.8 9.2l1.18-1.18-1.545-.472L11.2 6.8zm-.8 5l-1.18 1.18L12 14.8l1.18-1.18-1.545-.472-1.18 1.18zm-5-2.3L4.2 8.8l-1.18 1.18L4.8 11.2l1.18-1.18L4.2 8.8z"/>
  </svg>
);

export const PortugalFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 120" {...props}>
    <path fill="#006600" d="M0 0h180v120H0z"/>
    <path fill="#ff0000" d="M0 0h60v120H0z"/>
    <path d="M60 60a20 20 0 100-40 20 20 0 000 40z" fill="#ffff00"/>
  </svg>
);

export const IndiaFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
    <path fill="#f93" d="M0 0h900v200H0z"/>
    <path fill="#fff" d="M0 200h900v200H0z"/>
    <path fill="#128807" d="M0 400h900v200H0z"/>
    <g transform="translate(450 300)">
      <circle r="90" fill="#000080"/>
      <circle r="80" fill="#fff"/>
      <circle r="3.5" fill="#000080"/>
      <g id="d">
        <g id="c">
          <g id="b">
            <g id="a" fill="#000080">
              <circle r="9" transform="rotate(7.5 -8.6 198.5)"/>
              <path d="M0 17.5L.5 20l-.5-2.5-1.5-1.5.5 1.5L0 17.5z"/>
            </g>
            <use href="#a" transform="rotate(15)"/>
          </g>
          <use href="#b" transform="rotate(30)"/>
        </g>
        <use href="#c" transform="rotate(60)"/>
      </g>
      <use href="#d" transform="rotate(120)"/>
      <use href="#d" transform="rotate(240)"/>
    </g>
  </svg>
);
