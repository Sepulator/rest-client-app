import { AuthNav } from '@/components/auth-nav';
import React from 'react';

export default function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <section className="flex h-100 min-h-full flex-col items-center justify-center gap-5">
      <AuthNav />
      {children}
    </section>
  );
}
