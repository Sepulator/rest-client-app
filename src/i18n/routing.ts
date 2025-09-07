import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localeCookie: {
    name: 'LOCALE',
    maxAge: 172800,
  },
});

export type Locale = (typeof routing.locales)[number];
