import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

import { useEffect, useState } from 'react';

import type { UserData } from '@/stores/auth-context/types';

import { AuthContext } from '@/stores/auth-context/context';
import { createClient } from '@/utils/supabase/client';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    void supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
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
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
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

  return <AuthContext value={{ user, loading }}>{children}</AuthContext>;
};
