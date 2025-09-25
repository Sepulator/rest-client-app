import type { ReactNode } from 'react';

import { HeroUIProvider } from '@heroui/react';

import type { AuthContextType } from '@/stores/auth-context/types';

import { AuthContext } from '@/stores/auth-context/context';

type MockAuthProviderProps = {
  children: ReactNode;
  value: AuthContextType;
};

export const TestProviders = ({ children, value }: MockAuthProviderProps) => {
  return (
    <HeroUIProvider>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </HeroUIProvider>
  );
};
