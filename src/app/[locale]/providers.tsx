'use client';

import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

import type { UserData } from '@/stores/auth-context/types';

import { AuthProvider } from '@/stores/auth-context/auth-provider';

export type ProvidersProps = {
  children: ReactNode;
  userData?: UserData;
};

export function Providers({ children, userData }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <AuthProvider userData={userData}>
        <ToastProvider
          toastOffset={20}
          placement={'top-center'}
          toastProps={{
            variant: 'flat',
            timeout: 3000,
          }}
        />
        {children}
      </AuthProvider>
    </HeroUIProvider>
  );
}
