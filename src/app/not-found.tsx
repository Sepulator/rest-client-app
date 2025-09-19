import { cn } from '@heroui/react';
import Link from 'next/link';

import './[locale]/globals.css';
import { geistMono, geistSans } from '@/app/[locale]/fonts';
import { ROUTES } from '@/config/routes';

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, 'dark text-foreground bg-background antialiased')}>
        <section className="flex h-screen w-full max-w-screen-2xl flex-1 flex-col items-center justify-center">
          <span className="text-4xl">404</span>
          <h1>Global Not Found</h1>
          <p>Non-localized</p>
          <Link
            className="bg-primary-300 hover:bg-primary/90 rounded-medium mt-8 w-50 px-5 py-2 text-center text-sm font-medium transition-colors"
            href={ROUTES.MAIN}
          >
            Go Home
          </Link>
        </section>
      </body>
    </html>
  );
}
