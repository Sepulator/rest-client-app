'use client';

import type { Messages } from 'next-intl';
import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { NextIntlClientProvider } from 'next-intl';

import type { routing } from '@/i18n/routing';
import type { UserData } from '@/stores/auth-context/types';

import { AuthProvider } from '@/stores/auth-context/auth-provider';

export type ProvidersProps = {
  children: ReactNode;
  locale: (typeof routing.locales)[number];
  messages: Messages;
  userData?: UserData;
};

export function Providers({ children, locale, messages, userData }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Minsk">
      <HeroUIProvider>
        <AuthProvider userData={userData}>{children}</AuthProvider>
      </HeroUIProvider>
    </NextIntlClientProvider>
  );
}
