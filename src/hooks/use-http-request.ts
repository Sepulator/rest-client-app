import { useState } from 'react';

import type { Header, HttpMethod } from '@/types/http-request';

const HTTP_METHODS: readonly HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts';

export const useHttpRequest = () => {
  const [method, setMethod] = useState<string>(HTTP_METHODS[1]);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [body, setBody] = useState('');

  const executeRequest = async (headers: Header[]) => {
    if (!url) return;

    const requestHeaders = headers.reduce<Record<string, string>>((acc, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }

      return acc;
    }, {});

    const hasBody = !['GET', 'HEAD'].includes(method) && body.trim();

    if (hasBody) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    return fetch(url, { method, headers: requestHeaders, body });
  };

  return {
    method,
    setMethod,
    body,
    setBody,
    url,
    setUrl,
    executeRequest,
    HTTP_METHODS,
  };
};
