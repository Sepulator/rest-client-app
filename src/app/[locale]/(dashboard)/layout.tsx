'use client';
import { useState } from 'react';

import { Sidebar } from '@/features/side-bar/sidebar';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const [isTemporaryLogin, setIsTemporaryLogin] = useState(true);

  const tempLogout = () => {
    setIsTemporaryLogin(false);
  };

  return isTemporaryLogin ? (
    <section className="relative flex w-full flex-col gap-4 pt-5 md:flex-row">
      <Sidebar tempLogout={tempLogout} />
      <div className="flex min-h-[80vh] flex-1 content-center items-center justify-center px-6">{children}</div>
    </section>
  ) : (
    welcome
  );
}
