'use client';

import { useTranslations } from 'next-intl';

import { FallbackUi } from '@/components/fallback-ui/fallback-ui';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('FallbackUi');

  return <FallbackUi error={error} resetError={reset} title={t('title')} buttonMessage={t('button')} />;
}
