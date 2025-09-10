'use client';

import { Button, Input } from '@heroui/react';
import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';

import { RequestBodyEditor } from '@/components/request-body-editor/request-body-editor';
import { ResponseSection } from '@/components/response-section/response-section';
import { useHeaders } from '@/hooks/use-headers';
import { useHttpRequest } from '@/hooks/use-http-request';

import { HeadersSection } from './headers-section';
import { MethodSelector } from './method-selector';

export const HttpRequestForm = () => {
  const { method, setMethod, url, setUrl, executeRequest, HTTP_METHODS, response, isLoading } = useHttpRequest();
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders();

  const [isJsonMode, setIsJsonMode] = useState(true);
  const [jsonBody, setJsonBody] = useState('');
  const [textBody, setTextBody] = useState('');

  const handleSelectionChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMethod(event.target.value);
    },
    [setMethod]
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const body = isJsonMode ? jsonBody : textBody;

    await executeRequest(headers, body);
  };

  const handleModeToggle = (jsonMode: boolean) => {
    setIsJsonMode(jsonMode);
  };

  return (
    <div className="@container">
      <div className="grid max-w-2xl grid-cols-1 gap-6 @6xl:max-w-6xl @6xl:grid-cols-2">
        <section>
          <form onSubmit={(event) => void handleSubmit(event)} className="mb-6 flex flex-row">
            <MethodSelector method={method} methods={HTTP_METHODS} onChange={handleSelectionChange} />
            <Input value={url} onValueChange={setUrl} radius="none" className="border-1 border-l-0 border-gray-600" />
            <Button type="submit" color="primary" radius="none" className="h-auto">
              Send
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
              Text
            </Button>
            <Button
              size="sm"
              variant={isJsonMode ? 'solid' : 'bordered'}
              onPress={() => {
                handleModeToggle(true);
              }}
            >
              JSON
            </Button>
          </div>
          {isJsonMode ? (
            <RequestBodyEditor body={jsonBody} mode="json" onChange={setJsonBody} />
          ) : (
            <RequestBodyEditor body={textBody} mode="text" onChange={setTextBody} title="Text Content" />
          )}
        </section>

        <ResponseSection response={response} isLoading={isLoading} />
      </div>
    </div>
  );
};
