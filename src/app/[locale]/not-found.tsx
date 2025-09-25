import { useTranslations } from 'next-intl';

import { NotFoundComponent } from '@/components/not-found/not-found';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return <NotFoundComponent buttonText={t('button')} title={t('title')} description={t('description')} />;
}
