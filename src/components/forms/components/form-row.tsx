import type { FieldValues } from 'react-hook-form';

import { Button, Input } from '@heroui/react';
import { CloseIcon } from '@heroui/shared-icons';
import { useTranslations } from 'next-intl';

import type { DefaultField } from '@/stores/variables/store';

type FormRowFieldsProps<T extends FieldValues> = {
  data?: T & DefaultField;
  onUpdate?: (updates: Partial<DefaultField>) => void;
  onRemove: () => void;
};

export function FormRowFields<T extends FieldValues>({ data, onUpdate, onRemove }: FormRowFieldsProps<T>) {
  const t = useTranslations('RestInputs');

  return (
    <div className="mb-2 flex gap-2">
      <Input
        variant="underlined"
        value={data?.key}
        onValueChange={(key) => {
          onUpdate?.({ key });
        }}
        placeholder={t('key')}
        className="border-b-1 border-gray-600"
      />
      <Input
        variant="underlined"
        value={data?.value}
        onValueChange={(value) => {
          onUpdate?.({ value });
        }}
        placeholder={t('value')}
        className="border-b-1 border-gray-600"
      />
      <Button
        aria-label="Remove Input Row"
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
