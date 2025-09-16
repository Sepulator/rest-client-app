'use client';

import { useFieldArray, useForm } from 'react-hook-form';

import { FormRowFields } from '@/components/forms/components/form-row';
import { FormHeading } from '@/components/forms/components/forms-heading';

type VariablesFields = {
  variables: {
    key: string;
    value: string;
  }[];
};

const defaultField = { key: '', value: '' };

export function Variables() {
  const { control } = useForm<VariablesFields>({
    defaultValues: { variables: [defaultField] },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'variables' });

  const handleAdd = () => {
    append(defaultField);
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <form>
      <FormHeading handleAdd={handleAdd} />

      {fields.map((field, index) => {
        return (
          <FormRowFields
            key={field.id}
            onRemove={() => {
              handleRemove(index);
            }}
          />
        );
      })}
    </form>
  );
}
