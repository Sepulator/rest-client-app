import type { PropsWithChildren } from 'react';

import { cn } from '@heroui/react';
import React from 'react';

import { geistMono, geistSans } from '@/app/[locale]/fonts';

export function RootPagesLayout({ children }: PropsWithChildren) {
  return (
    <body className={cn(geistSans.variable, geistMono.variable, 'dark text-foreground bg-background antialiased')}>
      <main className="flex h-screen flex-1 justify-center px-6">{children}</main>
    </body>
  );
}
