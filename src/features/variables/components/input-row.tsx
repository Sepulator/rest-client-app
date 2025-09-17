import { Input } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import type { DefaultField } from '@/stores/variables/store';

import { ActionRow } from '@/components/forms-ui/action-row';
import { AlertTooltip } from '@/features/variables/components/alert-tooltip';
import { useDebounce } from '@/hooks/use-debounce-function/use-debounce-function';
import { useIsDuplicate, useVariablesActions } from '@/stores/variables/store';

type RowsControllerProps = {
  index: number;
  field: DefaultField;
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
    <ActionRow action={handleRemove}>
      <Input
        variant="underlined"
        defaultValue={field.key}
        onValueChange={(key) => {
          debouncedUpdate({ key });
        }}
        endContent={isDuplicate && <AlertTooltip content={t('duplicate')} />}
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
    </ActionRow>
  );
}

export const MemoizedRow = memo(InputRow);
