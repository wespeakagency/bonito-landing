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
    <g transform="translate(0, 2)">
      <path d="M6 8a7 7 0 1 1 12 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-5-7Z" />
      <path d="M12 8a3 3 0 0 1 3 3v2" />
    </g>
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
