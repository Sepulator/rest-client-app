'use client';

import { Sidebar } from '@/features/side-bar/sidebar';
import { useAuth } from '@/stores/auth-context/use-auth';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const { user, logout } = useAuth();

  return user ? (
    <section className="relative flex w-full flex-col gap-4 pt-5 md:flex-row">
      <Sidebar tempLogout={logout} />
      <div className="flex min-h-[80vh] flex-1 content-center items-center justify-center px-6">{children}</div>
    </section>
  ) : (
    welcome
  );
}
