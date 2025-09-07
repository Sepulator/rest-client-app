import type { SVGProps } from 'react';

import { DEFAULT_ICON_PROPS } from '@/config/default-icon-props';

export const ChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...DEFAULT_ICON_PROPS} {...props}>
      <path
        fillRule="evenodd"
        d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
};
