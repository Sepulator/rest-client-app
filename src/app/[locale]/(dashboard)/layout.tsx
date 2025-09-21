'use client';

import { Spinner } from '@heroui/react';
import { useEffect } from 'react';

import { ROUTES } from '@/config/routes';
import { Sidebar } from '@/features/side-bar/sidebar';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/stores/auth-context/use-auth';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(ROUTES.LOGIN);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return user ? (
    <section className="flex flex-1 flex-col gap-4 md:flex-row md:pt-5">
      <Sidebar />
      <div className="mt-4 flex w-full flex-1 flex-col px-6">{children}</div>
    </section>
  ) : (
    welcome
  );
}
