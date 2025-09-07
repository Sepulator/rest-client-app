import { hasLocale } from 'use-intl';

import { routing } from '@/i18n/routing';

export const isLocale = (locale: string) => hasLocale(routing.locales, locale);

export const isClient = typeof window !== 'undefined';
