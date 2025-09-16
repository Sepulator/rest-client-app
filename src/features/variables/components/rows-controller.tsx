import type { FieldError, FieldErrorsImpl, Merge, UseFormRegister } from 'react-hook-form';

import { memo } from 'react';

import type { VariablesFields, VariablesValue } from '@/features/variables/schema/form-schema';

import { FormRowFields } from '@/components/forms/components/form-row';
import { useIsDuplicate, useVariablesActions } from '@/stores/variables/store';

type RowsControllerProps = {
  index: number;
  onRemove: (index: number) => void;
  register: UseFormRegister<VariablesFields>;
  errors?: Merge<FieldError, FieldErrorsImpl<VariablesValue>>;
};

function RowsController({ index, onRemove, register, errors }: RowsControllerProps) {
  const { updateVariable, removeVariable } = useVariablesActions();
  const isDuplicate = useIsDuplicate(index);

  const handleRemove = () => {
    onRemove(index);
    removeVariable(index);
  };

  const keyError = isDuplicate ? 'Duplicate' : errors?.key?.message;

  return (
    <FormRowFields
      onUpdate={(updates) => {
        updateVariable(updates, index);
      }}
      onRemove={handleRemove}
      registeredData={{
        registerOptions: {
          key: register(`variables.${index}.key`),
          value: register(`variables.${index}.value`),
        },
        errors: { key: keyError, value: errors?.value?.message },
      }}
    />
  );
}

export const MemoizedRowsController = memo(RowsController);
