'use client';

import { Spinner } from '@heroui/react';

import { Sidebar } from '@/features/side-bar/sidebar';
import { useAuth } from '@/stores/auth-context/use-auth';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return user ? (
    <section className="flex flex-1 flex-col gap-4 md:flex-row md:pt-5">
      <Sidebar tempLogout={logout} />
      <div className="mt-4 flex w-full flex-1 flex-col px-6">{children}</div>
    </section>
  ) : (
    welcome
  );
}
