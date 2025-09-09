'use client';

import { Button, Input } from '@heroui/react';
import { useCallback, type ChangeEvent, type FormEvent } from 'react';

import { RequestBodyEditor } from '@/components/request-body-editor/request-body-editor';
import { useHeaders } from '@/hooks/use-headers';
import { useHttpRequest } from '@/hooks/use-http-request';

import { HeadersSection } from './headers-section';
import { MethodSelector } from './method-selector';

export const HttpRequestForm = () => {
  const { method, setMethod, url, setUrl, executeRequest, HTTP_METHODS, body, setBody } = useHttpRequest();
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders();

  const handleSelectionChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMethod(event.target.value);
    },
    [setMethod]
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await executeRequest(headers);
  };

  return (
    <section className="w-xl">
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

      <RequestBodyEditor body={body} mode="json" onChange={setBody} />
    </section>
  );
};
