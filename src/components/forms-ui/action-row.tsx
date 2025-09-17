import type { ReactNode } from 'react';

import { Button } from '@heroui/react';
import { CloseIcon } from '@heroui/shared-icons';
import { useTranslations } from 'next-intl';

type ActionRowProps = {
  action: () => void;
  children: ReactNode;
  icon?: ReactNode;
  ariaLabel?: string;
};

export function ActionRow({ children, action, icon, ariaLabel }: ActionRowProps) {
  const t = useTranslations('actionRow');

  return (
    <div className="mb-2 flex gap-2">
      {children}
      <Button
        aria-label={ariaLabel ?? t('remove')}
        startContent={icon ?? <CloseIcon />}
        className="w-fit"
        isIconOnly
        radius="none"
        variant="light"
        onPress={action}
      />
    </div>
  );
}
