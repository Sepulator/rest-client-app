import { heroui } from '@heroui/react';

export default heroui({
  defaultTheme: 'dark',
  prefix: 'heroui',
  themes: {
    dark: {
      colors: {
        background: '#0d1117',
      },
    },
  },
  layout: {
    fontSize: {
      tiny: '0.875rem',
      small: '1rem',
      medium: '1.125rem',
      large: '1.3rem',
    },
    lineHeight: {
      tiny: '1.25rem',
      small: '1.5rem',
      medium: '1.75rem',
      large: '1.9rem',
    },
  },
});
