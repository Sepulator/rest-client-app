import type { ReactNode } from 'react';

import { Button } from '@heroui/react';
import { CloseIcon } from '@heroui/shared-icons';
import { useTranslations } from 'next-intl';

type RemovableRowProps = {
  onRemove: () => void;
  children: ReactNode;
};

export function RemovableRow({ children, onRemove }: RemovableRowProps) {
  const t = useTranslations('RemovableRow');

  return (
    <div className="mb-2 flex gap-2">
      {children}
      <Button
        aria-label={t('remove')}
        startContent={<CloseIcon />}
        className="w-fit"
        isIconOnly
        radius="none"
        variant="light"
        onPress={onRemove}
      />
    </div>
  );
}
