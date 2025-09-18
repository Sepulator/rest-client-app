'use client';

import { Button, Input } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useCallback, useState, useTransition, type ChangeEvent, type FormEvent } from 'react';

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

  const handleModeToggle = (jsonMode: boolean) => {
    setIsJsonMode(jsonMode);
  };

  const handleTextMode = () => {
    handleModeToggle(false);
  };

  const handleJsonMode = () => {
    handleModeToggle(true);
  };

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

          <div className="mt-6 mb-4 flex gap-1">
            <Button size="sm" variant={isJsonMode ? 'bordered' : 'solid'} onPress={handleTextMode}>
              {t('text')}
            </Button>
            <Button size="sm" variant={isJsonMode ? 'solid' : 'bordered'} onPress={handleJsonMode}>
              {t('json')}
            </Button>
          </div>
          {isJsonMode ? (
            <RequestBodyEditor body={jsonBody} mode="json" onChange={setJsonBody} title={t('jsonContent')} />
          ) : (
            <RequestBodyEditor body={textBody} mode="text" onChange={setTextBody} title={t('textContent')} />
          )}
        </section>
        <section>
          <ResponseSection response={response} isLoading={isLoading} />
          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold">{t('codeTitle')}</h3>
            <CodeGeneration method={method} url={url} headers={headers} body={isJsonMode ? jsonBody : textBody} />
          </div>
        </section>
      </div>
    </div>
  );
};
