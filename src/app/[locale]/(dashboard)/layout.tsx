'use client';
import { useState } from 'react';

import { SideNavBar } from '@/components/side-nav-bar';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const [isTemporaryLogin, setIsTemporaryLogin] = useState(true);

  const tempLogout = () => {
    setIsTemporaryLogin(false);
  };

  return isTemporaryLogin ? (
    <section className="relative flex flex-row gap-4 pt-5">
      <SideNavBar tempLogout={tempLogout} />
      <div className="flex min-h-[80vh] flex-1 content-center items-center justify-center px-6">{children}</div>
    </section>
  ) : (
    welcome
  );
}
