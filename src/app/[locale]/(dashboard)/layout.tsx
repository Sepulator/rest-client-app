'use client';

import { Sidebar } from '@/features/side-bar/sidebar';
import { useAuth } from '@/stores/auth-context/use-auth';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const { user, logout } = useAuth();

  return user ? (
    <section className="flex flex-1 flex-col gap-4 pt-5 md:flex-row">
      <Sidebar tempLogout={logout} />
      <div className="mt-4 flex flex-1 flex-col self-start px-6">{children}</div>
    </section>
  ) : (
    welcome
  );
}
