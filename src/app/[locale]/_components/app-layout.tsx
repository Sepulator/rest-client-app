import type { ReactNode } from 'react';

import { Footer } from '@/components/footer/footer';
import Header from '@/components/header/header';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-screen-2xl flex-1">{children}</main>
      <Footer />
    </div>
  );
}
