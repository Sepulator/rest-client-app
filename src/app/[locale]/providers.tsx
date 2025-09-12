'use client';

import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';

import type { UserData } from '@/stores/auth-context/types';

import { AuthProvider } from '@/stores/auth-context/auth-provider';

export type ProvidersProps = {
  children: ReactNode;
  userData?: UserData;
};

export function Providers({ children, userData }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <AuthProvider userData={userData}>{children}</AuthProvider>
    </HeroUIProvider>
  );
}
