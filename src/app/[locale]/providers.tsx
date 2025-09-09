'use client';

import type { Messages } from 'next-intl';
import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { NextIntlClientProvider } from 'next-intl';

import type { routing } from '@/i18n/routing';

type ProvidersProps = {
  children: ReactNode;
  locale: (typeof routing.locales)[number];
  messages: Messages;
};

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </NextIntlClientProvider>
  );
}
