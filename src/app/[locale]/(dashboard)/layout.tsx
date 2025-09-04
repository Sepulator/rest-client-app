'use client';
import { useState } from 'react';

import { SideNavBar } from '@/components/side-nav-bar';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const [isTemporaryLogin, setIsTemporaryLogin] = useState(true);

  const tempLogout = () => {
    setIsTemporaryLogin(false);
  };

  return isTemporaryLogin ? (
    <section className="flex h-100 min-h-full flex-row items-center gap-4 divide-x-1">
      <SideNavBar tempLogout={tempLogout} />
      <div className="flex flex-1 justify-center">{children}</div>
    </section>
  ) : (
    welcome
  );
}
