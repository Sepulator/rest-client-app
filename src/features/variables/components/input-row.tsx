import { Input } from '@heroui/react';
import { InfoIcon } from '@heroui/shared-icons';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import type { DefaultField } from '@/stores/variables/store';

import { RemovableRow } from '@/components/forms-ui/deletable-row';
import { useDebounce } from '@/hooks/use-debounce-function/use-debounce-function';
import { useIsDuplicate, useVariablesActions } from '@/stores/variables/store';

type RowsControllerProps = {
  index: number;
  field: { key: string; value: string };
};

function InputRow({ index, field }: RowsControllerProps) {
  const { updateVariable, removeVariable } = useVariablesActions();
  const isDuplicate = useIsDuplicate(index);
  const t = useTranslations('Variables');

  const debouncedUpdate = useDebounce((updates: Partial<DefaultField>) => {
    updateVariable(updates, index);
  });

  const handleRemove = () => {
    removeVariable(index);
  };

  return (
    <RemovableRow onRemove={handleRemove}>
      <Input
        variant="underlined"
        defaultValue={field.key}
        onValueChange={(key) => {
          debouncedUpdate({ key });
        }}
        endContent={isDuplicate && <InfoIcon className="text-danger-500" />}
        placeholder={t('key')}
        className="border-default-300 border-b-1"
      />
      <Input
        variant="underlined"
        defaultValue={field.value}
        onValueChange={(value) => {
          debouncedUpdate({ value });
        }}
        placeholder={t('value')}
        className="border-default-300 border-b-1"
      />
    </RemovableRow>
  );
}

export const MemoizedRow = memo(InputRow);
