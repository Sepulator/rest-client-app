'use client';

import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { NextIntlClientProvider } from 'next-intl';

import type { routing } from '@/i18n/routing';

type ProvidersProps = {
  children: ReactNode;
  locale: (typeof routing.locales)[number];
};

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </NextIntlClientProvider>
  );
}
