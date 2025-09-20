import { HeroUIProvider } from '@heroui/react';

import type { ProvidersProps } from '@/app/[locale]/providers';

import { AuthProvider } from '@/stores/auth-context/auth-provider';

export const TestProviders = ({ children, userData }: ProvidersProps) => {
  return (
    <HeroUIProvider>
      <AuthProvider userData={userData}>{children}</AuthProvider>
    </HeroUIProvider>
  );
};
