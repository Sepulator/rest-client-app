import type { ReactNode } from 'react';

import Header from '@/components/header/header';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-screen-2xl flex-1">{children}</main>
      <footer className="flex w-full items-center justify-center border-t-1 p-5">footer</footer>
    </div>
  );
}
