'use client';
import { useState } from 'react';

import { SideNavBar } from '@/components/side-nav-bar';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const [isTemporaryLogin, setIsTemporaryLogin] = useState(true);

  const tempLogout = () => {
    setIsTemporaryLogin(false);
  };

  return isTemporaryLogin ? (
    <section className="flex min-h-full flex-row gap-4 divide-x-1">
      <SideNavBar tempLogout={tempLogout} />
      <div className="flex min-h-[200vh] flex-1 justify-center">{children}</div>
    </section>
  ) : (
    welcome
  );
}
