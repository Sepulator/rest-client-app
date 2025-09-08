'use client';

import type { ChangeEvent, FormEvent } from 'react';

import { Button, Input } from '@heroui/react';

import { useHeaders } from '@/hooks/use-headers';
import { useHttpRequest } from '@/hooks/use-http-request';

import { HeadersSection } from './headers-section';
import { MethodSelector } from './method-selector';

export const HttpRequestForm = () => {
  const { method, setMethod, url, setUrl, executeRequest, HTTP_METHODS } = useHttpRequest();
  const { headers, addHeader, updateHeader, removeHeader } = useHeaders();

  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await executeRequest(headers);
  };

  return (
    <>
      <form onSubmit={(event) => void handleSubmit(event)} className="flex w-xl flex-row">
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
    </>
  );
};
