'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { ActionRow } from '@/components/forms-ui/action-row';
import { FormHeading } from '@/components/forms-ui/forms-heading';
import { ArrowPathIcon } from '@/components/icons/arrow-path';
import { Loading } from '@/components/loading/loading';
import { MemoizedRow } from '@/features/variables/components/input-row';
import { useIsHydrated, useVariables, useVariablesActions } from '@/stores/variables/selectors';

const ROWS_KEYS = ['key', 'value'] as const;

export function Variables() {
  const fields = useVariables();
  const { addVariable, clearVariables } = useVariablesActions();
  const t = useTranslations('Variables');
  const hydrated = useIsHydrated();

  if (!hydrated) {
    return null;
  }

  return (
    <div className="mb-10">
      <FormHeading action={addVariable} heading={t('heading')} actionText={t('addButton')} />

      <ActionRow action={clearVariables} ariaLabel={t('reset')} icon={<ArrowPathIcon />}>
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

export const VariablesDynamic = dynamic(
  () => import('@/features/variables/components/variables').then((module_) => module_.Variables),
  { loading: () => <Loading />, ssr: false }
);
