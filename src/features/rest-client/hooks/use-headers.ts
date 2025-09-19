import { useState } from 'react';

import type { Header } from '@/types/http-request';

import { getHeadersFromSearchParams } from '@/features/rest-client/utils/get-parameters';

export const useHeaders = (initialSearchParams?: Record<string, string>) => {
  const [headers, setHeaders] = useState<Header[]>(() => getHeadersFromSearchParams(initialSearchParams));

  const addHeader = () => {
    setHeaders((previous) => [...previous, { id: crypto.randomUUID(), key: '', value: '' }]);
  };

  const updateHeader = (id: string, updates: Partial<Header>) => {
    setHeaders((previous) => previous.map((header) => (header.id === id ? { ...header, ...updates } : header)));
  };

  const removeHeader = (id: string) => {
    setHeaders((previous) => previous.filter((header) => header.id !== id));
  };

  return {
    headers,
    setHeaders,
    addHeader,
    updateHeader,
    removeHeader,
  };
};
