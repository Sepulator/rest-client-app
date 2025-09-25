import { Input } from '@heroui/react';
import { useTranslations } from 'next-intl';

import type { Header } from '@/types/http-request';

import { ActionRow } from '@/components/forms-ui/action-row';

type HeaderRequestProps = {
  header: Header;
  onUpdate: (updates: Partial<Header>) => void;
  onRemove: () => void;
};

export const HeaderRequest = ({ header, onUpdate, onRemove }: HeaderRequestProps) => {
  const t = useTranslations('RestClient');

  return (
    <ActionRow action={onRemove} ariaLabel={t('removeHeader')}>
      <Input
        variant="underlined"
        value={header.key}
        onValueChange={(key) => {
          onUpdate({ key });
        }}
        placeholder={t('header')}
        className="border-default-300 border-b-1"
      />
      <Input
        variant="underlined"
        value={header.value}
        onValueChange={(value) => {
          onUpdate({ value });
        }}
        placeholder={t('value')}
        className="border-default-300 border-b-1"
      />
    </ActionRow>
  );
};
