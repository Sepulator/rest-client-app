import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  localeCookie: {
    name: 'NEXT_LOCALE',
    maxAge: 172800,
  },
});

export type Locale = (typeof routing.locales)[number];
