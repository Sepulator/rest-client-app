'use client';
import { useTranslations } from 'next-intl';

import { FormHeading } from '@/components/forms-ui/forms-heading';
import { MemoizedRow } from '@/features/variables/components/input-row';
import { useIsHydrated, useVariables, useVariablesActions } from '@/stores/variables/store';

export function Variables() {
  const fields = useVariables();
  const { addVariable } = useVariablesActions();
  const t = useTranslations('Variables');
  const hydrated = useIsHydrated();

  if (!hydrated) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <FormHeading action={addVariable} heading={t('heading')} actionText={t('addButton')} />

      {fields.map((field, index) => {
        return <MemoizedRow key={field.id} index={index} field={field} />;
      })}
    </div>
  );
}
