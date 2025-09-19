import { LoadingIcon } from '@heroui/shared-icons';
import { useTranslations } from 'next-intl';

export function Loading() {
  const t = useTranslations('userActions.actions');

  return (
    <div className="flex h-64 items-center justify-center" role="status" aria-label={t('loading')}>
      <LoadingIcon width="48px" />
    </div>
  );
}
