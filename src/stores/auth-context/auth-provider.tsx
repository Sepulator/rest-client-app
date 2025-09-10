import type { PropsWithChildren } from 'react';

import { useCallback, useState } from 'react';

import type { UserData } from '@/stores/auth-context/types';

import { AuthContext } from '@/stores/auth-context/context';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>({ name: 'Temp User', email: 'tempemail@gmail.com' });

  const login = useCallback((userData: UserData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
};
