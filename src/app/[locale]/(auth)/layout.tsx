import { getLocale } from 'next-intl/server';

import { AuthNav } from '@/components/auth-nav';
import { redirect } from '@/i18n/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  const supabase = await createClient();
  const locale = await getLocale();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect({ href: '/', locale });
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-5 p-6">
      <AuthNav />
      {children}
    </section>
  );
}
