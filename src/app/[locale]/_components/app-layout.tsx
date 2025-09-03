import { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen flex-col">
      <header className="flex w-full items-center justify-center border-b-1 p-5">header</header>
      <main className="flex-1">{children}</main>
      <footer className="flex w-full items-center justify-center border-t-1 p-5">footer</footer>
    </div>
  );
}
