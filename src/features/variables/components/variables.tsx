'use client';

import { useTranslations } from 'next-intl';

import { ActionRow } from '@/components/forms-ui/action-row';
import { FormHeading } from '@/components/forms-ui/forms-heading';
import { ArrowPathIcon } from '@/components/icons/arrow-path';
import { MemoizedRow } from '@/features/variables/components/input-row';
import { useIsHydrated, useVariables, useVariablesActions } from '@/stores/variables/store';

const ROWS_KEYS = ['key', 'value'] as const;

export function Variables() {
  const fields = useVariables();
  const { addVariable, clearVariables } = useVariablesActions();
  const t = useTranslations('Variables');
  const hydrated = useIsHydrated();

  if (!hydrated) {
    return <div>Loading</div>;
  }

  return (
    <div className="mb-10">
      <FormHeading action={addVariable} heading={t('heading')} actionText={t('addButton')} />

      <ActionRow action={clearVariables} ariaLabel={t('reset')} icon={<ArrowPathIcon className="text-default-500" />}>
        {ROWS_KEYS.map((key) => (
          <h4 key={key} className="w-full">
            {t(key)}
          </h4>
        ))}
      </ActionRow>

      {fields.map((field, index) => {
        return <MemoizedRow key={field.id} index={index} field={field} />;
      })}
    </div>
  );
}
