import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { ReactNode } from 'react';

import { useEffect, useState } from 'react';

import type { UserData } from '@/stores/auth-context/types';

import { useRouter } from '@/i18n/navigation';
import { AuthContext } from '@/stores/auth-context/context';
import { supabase } from '@/utils/supabase/history-insert';

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      if (session?.user.email) {
        setUser({
          id: session.user.id,
          email: session.user.email,
        });
      } else {
        setUser(undefined);
        if (event === 'SIGNED_OUT') {
          router.push('/');
        }
      }
      setLoading(false);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return <AuthContext value={{ user, loading }}>{children}</AuthContext>;
};
