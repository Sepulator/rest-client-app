import { getReasonPhrase } from 'http-status-codes';
import { useState } from 'react';

import type { Header, HttpMethod, ResponseData } from '@/types/http-request';

const HTTP_METHODS: readonly HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts/1';
const responseData: ResponseData = {
  body: '',
  headers: {},
  status: 0,
  statusText: '',
  timestamp: '',
  duration: 0,
  requestSize: 0,
  responseSize: 0,
};

export const useHttpRequest = () => {
  const [method, setMethod] = useState<string>(HTTP_METHODS[0]);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [response, setResponse] = useState<ResponseData>(responseData);
  const [isLoading, setIsLoading] = useState(false);

  const executeRequest = async (headers: Header[], body = '') => {
    if (!url) return;

    setIsLoading(true);
    const timestamp = new Date().toISOString();
    const startTime = performance.now();

    try {
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
          requestHeaders['Content-Type'] = 'application/json';
        }
      }

      const requestSize = new Blob([requestBody ?? '']).size;
      const result = await fetch(url, { method, headers: requestHeaders, body: requestBody });
      const responseBody = await result.text();
      const duration = performance.now() - startTime;
      const responseSize = new Blob([responseBody]).size;

      setResponse({
        status: result.status,
        statusText: getReasonPhrase(result.status),
        headers: Object.fromEntries(result.headers.entries()),
        body: responseBody,
        timestamp,
        duration,
        requestSize,
        responseSize,
      });
    } catch (error) {
      const duration = performance.now() - startTime;

      setResponse({
        ...responseData,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp,
        duration,
        requestSize: new Blob([body || '']).size,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    method,
    setMethod,
    url,
    setUrl,
    executeRequest,
    HTTP_METHODS,
    response,
    isLoading,
  };
};
