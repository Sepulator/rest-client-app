import type { ReactNode } from 'react';

import { useCallback, useState } from 'react';

import type { UserData } from '@/stores/auth-context/types';

import { AuthContext } from '@/stores/auth-context/context';

type AuthProviderProps = {
  userData?: UserData;
  children: ReactNode;
};

export const AuthProvider = ({ children, userData }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | undefined>(userData);

  const login = useCallback((userData: UserData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(undefined);
  }, []);

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};
