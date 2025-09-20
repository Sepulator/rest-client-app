'use client';

import { useTranslations } from 'next-intl';

import { ModeSwitcher } from '@/components/ui/mode-switcher';
import { JsonBodyEditor, TextBodyEditor } from '@/features/rest-client/components/request-body-editor';
import { useIsJsonMode, useSetIsJsonMode } from '@/stores/rest-client/selectors';

export const RequestBodySwitcher = () => {
  const isJsonMode = useIsJsonMode();
  const setIsJsonMode = useSetIsJsonMode();
  const t = useTranslations('RestClient');

  const modeOptions = [
    {
      value: false,
      label: t('text'),
      children: <TextBodyEditor title={t('textContent')} />,
    },
    {
      value: true,
      label: t('json'),
      children: <JsonBodyEditor title={t('jsonContent')} />,
    },
  ];

  return <ModeSwitcher options={modeOptions} value={isJsonMode} onChange={setIsJsonMode} className="mt-6" />;
};
