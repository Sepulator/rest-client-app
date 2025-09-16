import { valibotResolver } from '@hookform/resolvers/valibot';
import { useFieldArray, useForm } from 'react-hook-form';

import type { VariablesFields } from '@/features/variables/schema/form-schema';

import { FormHeading } from '@/components/forms/components/forms-heading';
import { MemoizedRowsController } from '@/features/variables/components/rows-controller';
import { variablesSchema } from '@/features/variables/schema/form-schema';
import { defaultField, useVariables, useVariablesActions } from '@/stores/variables/store';

export function VariableForm() {
  const defaultFields = useVariables();
  const { addVariable } = useVariablesActions();

  const {
    control,
    register,
    formState: { errors },
  } = useForm<VariablesFields>({
    defaultValues: { variables: defaultFields },
    mode: 'onChange',
    resolver: valibotResolver(variablesSchema),
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'variables' });

  const handleAdd = () => {
    append(defaultField);
    addVariable();
  };

  return (
    <form>
      <FormHeading handleAdd={handleAdd} />

      {fields.map((field, index) => {
        return (
          <MemoizedRowsController
            key={field.id}
            index={index}
            onRemove={remove}
            errors={errors.variables?.[index]}
            register={register}
          />
        );
      })}
    </form>
  );
}
