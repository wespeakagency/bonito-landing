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
  <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40C28.3439 40 35.5323 34.6122 38.3308 27H20V13H40V20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0H39.25V11H20V0Z" fill="currentColor"/>
    <text x="50" y="28" fontFamily="Montserrat, sans-serif" fontSize="24" fontWeight="bold" fill="currentColor">
      BONITO
    </text>
  </svg>
);
