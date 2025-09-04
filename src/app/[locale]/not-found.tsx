'use client';

import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <section className="flex h-full items-center justify-center">
      <h2>{t('title')}</h2>
    </section>
  );
}
