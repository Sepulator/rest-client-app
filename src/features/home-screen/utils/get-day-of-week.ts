import type { Locale } from 'next-intl';

export const getDayOfWeek = (locale: Locale) => {
  const today = new Date();

  return today.toLocaleDateString(locale, {
    weekday: 'long',
  });
};
