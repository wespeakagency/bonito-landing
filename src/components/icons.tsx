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
    <path d="M6 10a7 7 0 1 1 12 0v5a7 7 0 0 1-7 7h-1a7 7 0 0 1-5-7Z" />
    <path d="M12 10a3 3 0 0 1 3 3v2" />
  </svg>
);

export const BonitoLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg 
      viewBox="0 0 140 25" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      {...props}
    >
      <text 
        x="0" 
        y="19" 
        fontFamily="Inter, sans-serif" 
        fontSize="22" 
        fontWeight="600" 
        fill="currentColor"
      >
        BONITO
      </text>
    </svg>
);
