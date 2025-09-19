'use client';

import { useTranslations } from 'next-intl';

import { ModeSwitcher } from '@/components/ui/mode-switcher';
import { RequestBodyEditor } from '@/features/rest-client/components/request-body-editor';
import {
  useJsonBody,
  useSetJsonBody,
  useSetTextBody,
  useTextBody,
  useIsJsonMode,
  useSetIsJsonMode,
} from '@/stores/rest-client/selectors';

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

const JsonBodyEditor = ({ title }: { title?: string }) => {
  const body = useJsonBody();
  const setBody = useSetJsonBody();

  return <RequestBodyEditor body={body} onChange={setBody} mode="json" title={title} />;
};

const TextBodyEditor = ({ title }: { title?: string }) => {
  const body = useTextBody();
  const setBody = useSetTextBody();

  return <RequestBodyEditor body={body} onChange={setBody} mode="text" title={title} />;
};
