import { SideNavBar } from './_components/side-nav-bar/side-nav-bar';
import React from 'react';

export default function DashboardLayout({ children, welcome }: LayoutProps<'/[locale]'>) {
  const isTempLogin = false;

  return isTempLogin ? (
    <section className="flex h-100 min-h-full flex-row items-center gap-4 divide-x-1">
      <SideNavBar />
      <div className="flex flex-1 justify-center">{children}</div>
    </section>
  ) : (
    welcome
  );
}
