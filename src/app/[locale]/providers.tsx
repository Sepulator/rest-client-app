'use client';

import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

import { AuthProvider } from '@/stores/auth-context/auth-provider';

export type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <AuthProvider>
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
