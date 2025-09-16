import type { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';

import { Input } from '@heroui/react';
import { InfoIcon } from '@heroui/shared-icons';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import type { VariablesFields, VariablesValue } from '@/features/variables/schema/form-schema';
import type { DefaultField } from '@/stores/variables/store';

import { RemovableRow } from '@/components/forms-ui/deletable-row';
import { useDebounce } from '@/hooks/use-debounce-function/use-debounce-function';
import { useIsDuplicate, useVariablesActions } from '@/stores/variables/store';

type RowsControllerProps = {
  index: number;
  onRemove: (index: number) => void;
  register: UseFormRegister<VariablesFields>;
  errors?: Merge<FieldError, FieldErrorsImpl<VariablesValue>>;
};

function InputRow({ index, onRemove, register, errors }: RowsControllerProps) {
  const { updateVariable, removeVariable } = useVariablesActions();
  const isDuplicate = useIsDuplicate(index);
  const t = useTranslations('Variables');

  const debouncedUpdate = useDebounce((updates: Partial<DefaultField>) => {
    updateVariable(updates, index);
  });

  const handleRemove = () => {
    onRemove(index);
    removeVariable(index);
  };

  const keyError = isDuplicate ? t('duplicate') : errors?.key?.message;

  return (
    <RemovableRow onRemove={handleRemove}>
      <Input
        {...register(`variables.${index}.key`)}
        variant="underlined"
        onValueChange={(key) => {
          debouncedUpdate({ key });
        }}
        endContent={keyError && <InfoIcon className="text-danger-500" />}
        placeholder={t('key')}
        className="border-default-300 border-b-1"
      />
      <Input
        {...register(`variables.${index}.value`)}
        variant="underlined"
        onValueChange={(value) => {
          debouncedUpdate({ value });
        }}
        endContent={errors?.value?.message && <InfoIcon className="text-danger-500" />}
        placeholder={t('value')}
        className="border-default-300 border-b-1"
      />
    </RemovableRow>
  );
}

export const MemoizedRow = memo(InputRow);
