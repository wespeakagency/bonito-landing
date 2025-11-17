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
      viewBox="0 0 100 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25C20.4086 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0Z"
        fill="currentColor"
      />
      <text
        x="35"
        y="19"
        fontFamily="Inter, sans-serif"
        fontSize="16"
        fontWeight="bold"
        fill="currentColor"
      >
        BONITO
      </text>
    </svg>
);
