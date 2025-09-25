'use client';

import './[locale]/globals.css';
import { RootPagesLayout } from '@/app/[locale]/_components/root-pages-layout';
import { FallbackUi } from '@/components/fallback-ui/fallback-ui';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <html lang="en">
      <RootPagesLayout>
        <FallbackUi title="Something went wrong" error={error} resetError={reset} buttonMessage="Reload" />
      </RootPagesLayout>
    </html>
  );
}
