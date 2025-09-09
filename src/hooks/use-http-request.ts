import { useState } from 'react';

import type { Header, HttpMethod } from '@/types/http-request';

const HTTP_METHODS: readonly HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts/1';

export const useHttpRequest = () => {
  const [method, setMethod] = useState<string>(HTTP_METHODS[0]);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [_, setError] = useState<string | null>(null);

  const executeRequest = async (headers: Header[], body: string) => {
    if (!url) return;

    const requestHeaders = headers.reduce<Record<string, string>>((acc, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }

      return acc;
    }, {});

    const hasBody = !['GET', 'HEAD'].includes(method) && body.trim();
    let requestBody: string | undefined;

    if (hasBody) {
      requestBody = body;

      if (!requestHeaders['Content-Type'] && !requestHeaders['content-type']) {
        try {
          JSON.parse(body);
          requestHeaders['Content-Type'] = 'application/json';
        } catch {
          setError('Invalid JSON');
        }
      }
    }

    return fetch(url, { method, headers: requestHeaders, body: requestBody });
  };

  return {
    method,
    setMethod,
    url,
    setUrl,
    executeRequest,
    HTTP_METHODS,
  };
};
