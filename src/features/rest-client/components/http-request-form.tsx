'use client';

import { Button, Input } from '@heroui/react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useCallback, useState, useTransition, type ChangeEvent, type FormEvent } from 'react';

import { Loading } from '@/components/loading/loading';
import { ModeSwitcher } from '@/components/ui/mode-switcher';
import { CodeGeneration } from '@/features/rest-client/components/code-generation';
import { HeadersSection } from '@/features/rest-client/components/headers-section';
import { MethodSelector } from '@/features/rest-client/components/method-selector';
import { RequestBodyEditor } from '@/features/rest-client/components/request-body-editor';
import { ResponseSection } from '@/features/rest-client/components/response-section';
import { HTTP_METHODS } from '@/features/rest-client/constants/http-request';
import { useHeaders } from '@/features/rest-client/hooks/use-headers';
import { useHttpRequest } from '@/features/rest-client/hooks/use-http-request';
import { getBodyFromParams } from '@/features/rest-client/utils/get-parameters';

type Props = {
  initialParams?: string[];
  initialSearchParams?: Record<string, string>;
};

export const HttpRequestForm = ({ initialParams, initialSearchParams }: Props = {}) => {
  const [isLoading, startTransition] = useTransition();
  const { method, setMethod, url, setUrl, executeRequest, response } = useHttpRequest(initialParams);
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders(initialSearchParams);
  const [isJsonMode, setIsJsonMode] = useState(true);
  const [jsonBody, setJsonBody] = useState(() => getBodyFromParams(initialParams));
  const [textBody, setTextBody] = useState('');

  const t = useTranslations('RestClient');

  const handleSelectionChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMethod(event.target.value);
    },
    [setMethod]
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!url) {
      return;
    }
    const body = isJsonMode ? jsonBody : textBody;

    startTransition(async () => {
      const routeUrl = await executeRequest(headers, body);

      if (routeUrl) {
        window.history.replaceState(null, '', routeUrl);
      }
    });
  };

  const modeOptions = [
    {
      value: false,
      label: t('text'),
      children: <RequestBodyEditor body={textBody} mode="text" onChange={setTextBody} title={t('textContent')} />,
    },
    {
      value: true,
      label: t('json'),
      children: <RequestBodyEditor body={jsonBody} mode="json" onChange={setJsonBody} title={t('jsonContent')} />,
    },
  ];

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @6xl:grid-cols-2">
        <section>
          <form onSubmit={handleSubmit} className="mb-6 flex flex-row">
            <MethodSelector method={method} methods={HTTP_METHODS} onChange={handleSelectionChange} />
            <Input
              value={url}
              placeholder={t('url')}
              onValueChange={setUrl}
              radius="none"
              className="border-1 border-l-0 border-gray-600"
            />
            <Button
              type="submit"
              color="primary"
              radius="none"
              className="h-auto"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {t('send')}
            </Button>
          </form>

          <HeadersSection
            headers={headers}
            onAddHeader={addHeader}
            onUpdateHeader={updateHeader}
            onRemoveHeader={removeHeader}
          />

          <ModeSwitcher options={modeOptions} value={isJsonMode} onChange={setIsJsonMode} className="mt-6" />
        </section>
        <section>
          <ResponseSection response={response} isLoading={isLoading} />
          <h3 className="mt-6 mb-4 text-lg font-semibold">{t('codeTitle')}</h3>
          <CodeGeneration method={method} url={url} headers={headers} body={isJsonMode ? jsonBody : textBody} />
        </section>
      </div>
    </div>
  );
};

export const HttpRequestFormDynamic = dynamic(
  () => import('@/features/rest-client/components/http-request-form').then((module_) => module_.HttpRequestForm),
  { loading: () => <Loading />, ssr: false }
);
