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
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 8.5c4.69 0 8.5 3.81 8.5 8.5V21h-4v-4.5c0-2.48-2.02-4.5-4.5-4.5s-4.5 2.02-4.5 4.5V21h-4V8.5c0-4.69 3.81-8.5 8.5-8.5v4Z" />
  </svg>
);
