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
