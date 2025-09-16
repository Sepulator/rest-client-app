import { valibotResolver } from '@hookform/resolvers/valibot';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import type { VariablesFields } from '@/features/variables/schema/form-schema';

import { FormHeading } from '@/components/forms-ui/forms-heading';
import { MemoizedRow } from '@/features/variables/components/input-row';
import { variablesSchema } from '@/features/variables/schema/form-schema';
import { defaultField, useVariables, useVariablesActions } from '@/stores/variables/store';

export function VariableForm() {
  const defaultFields = useVariables();
  const { addVariable } = useVariablesActions();
  const t = useTranslations('Variables');

  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = useForm<VariablesFields>({
    defaultValues: { variables: defaultFields },
    mode: 'onChange',
    resolver: valibotResolver(variablesSchema),
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'variables' });

  useEffect(() => {
    void trigger();
  }, [trigger]);

  const handleAdd = () => {
    append(defaultField);
    addVariable();
  };

  return (
    <form>
      <FormHeading action={handleAdd} heading={t('heading')} actionText={t('addButton')} />

      {fields.map((field, index) => {
        return (
          <MemoizedRow
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
