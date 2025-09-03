import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localeCookie: {
    name: 'LOCALE',
    maxAge: 2 * 24 * 60 * 60,
  },
});
