'use client';

import { Button, Input } from '@heroui/react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useCallback, useState, useTransition, type ChangeEvent, type FormEvent } from 'react';

import { Loading } from '@/components/loading/loading';
import { HeadersSection } from '@/features/rest-client/components/headers-section';
import { MethodSelector } from '@/features/rest-client/components/method-selector';
import { RequestBodyEditor } from '@/features/rest-client/components/request-body-editor';
import { ResponseSection } from '@/features/rest-client/components/response-section';
import { useHeaders } from '@/features/rest-client/hooks/use-headers';
import { useHttpRequest } from '@/features/rest-client/hooks/use-http-request';

export const HttpRequestForm = () => {
  const [isLoading, startTransition] = useTransition();
  const { method, setMethod, url, setUrl, executeRequest, HTTP_METHODS, response } = useHttpRequest();
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders();
  const [isJsonMode, setIsJsonMode] = useState(true);
  const [jsonBody, setJsonBody] = useState('');
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
      await executeRequest(headers, body);
    });
  };

  const handleModeToggle = (jsonMode: boolean) => {
    setIsJsonMode(jsonMode);
  };

  return (
    <div className="@container">
      <div className="grid max-w-2xl grid-cols-1 gap-6 @6xl:max-w-6xl @6xl:grid-cols-2">
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

          <div className="mt-6 mb-4 flex gap-1">
            <Button
              size="sm"
              variant={isJsonMode ? 'bordered' : 'solid'}
              onPress={() => {
                handleModeToggle(false);
              }}
            >
              {t('text')}
            </Button>
            <Button
              size="sm"
              variant={isJsonMode ? 'solid' : 'bordered'}
              onPress={() => {
                handleModeToggle(true);
              }}
            >
              {t('json')}
            </Button>
          </div>
          {isJsonMode ? (
            <RequestBodyEditor body={jsonBody} mode="json" onChange={setJsonBody} title={t('jsonContent')} />
          ) : (
            <RequestBodyEditor body={textBody} mode="text" onChange={setTextBody} title={t('textContent')} />
          )}
        </section>

        <ResponseSection response={response} isLoading={isLoading} />
      </div>
    </div>
  );
};

export const HttpRequestFormDynamic = dynamic(
  () => import('@/features/rest-client/components/http-request-form').then((module_) => module_.HttpRequestForm),
  { loading: () => <Loading />, ssr: false }
);
