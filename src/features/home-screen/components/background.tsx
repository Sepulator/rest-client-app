import type { SVGProps } from 'react';

export const Background = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props}>
      <circle cx="444.5" cy="444.5" r="444.5" fill="url(#paint0_radial_20_2)" fillOpacity="0.08" />
      <defs>
        <radialGradient
          id="paint0_radial_20_2"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(464.661 443.54) rotate(77.8605) scale(429.135)"
        >
          <stop stopColor="#C78315" />
          <stop offset="0.75" stopColor="#DFAB1B" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};
