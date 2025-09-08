import { useState } from 'react';

import type { Header } from '@/types/http-request';

export const useHeaders = (initialHeaders: Header[] = [{ id: '1', key: 'Accept', value: '*/*' }]) => {
  const [headers, setHeaders] = useState<Header[]>(initialHeaders);

  const addHeader = () => {
    setHeaders((previous) => [...previous, { id: Date.now().toString(), key: '', value: '' }]);
  };

  const updateHeader = (id: string, updates: Partial<Header>) => {
    setHeaders((previous) => previous.map((header) => (header.id === id ? { ...header, ...updates } : header)));
  };

  const removeHeader = (id: string) => {
    setHeaders((previous) => previous.filter((header) => header.id !== id));
  };

  return {
    headers,
    addHeader,
    updateHeader,
    removeHeader,
  };
};
