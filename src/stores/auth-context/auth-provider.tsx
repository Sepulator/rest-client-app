import type { ReactNode } from 'react';

import { useCallback, useEffect, useState } from 'react';

import type { UserData } from '@/stores/auth-context/types';

import { supabase } from '@/lib/supabase';
import { AuthContext } from '@/stores/auth-context/context';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.email) {
        setUser({
          id: session.user.id,
          email: session.user.email,
        });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user.email) {
        setUser({
          id: session.user.id,
          email: session.user.email,
        });
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  return <AuthContext value={{ user, loading, login, signUp, logout }}>{children}</AuthContext>;
};
