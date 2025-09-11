import { getReasonPhrase } from 'http-status-codes';
import { useState } from 'react';
import { parse } from 'valibot';

import type { Header, ResponseData } from '@/types/http-request';

import { DEFAULT_URL, HTTP_METHODS, responseData } from '@/features/rest-client/constants/http-request';
import { ProxyResponseSchema } from '@/features/rest-client/schemas/proxy-schema';

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

      const result = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, method, headers: requestHeaders, body: requestBody }),
      });

      const data: unknown = await result.json();
      const proxyResponse = parse(ProxyResponseSchema, data);
      const duration = performance.now() - startTime;
      const responseSize = new Blob([proxyResponse.body]).size;

      if (proxyResponse.error) {
        throw new Error(proxyResponse.error);
      }

      setResponse({
        status: proxyResponse.status,
        statusText: getReasonPhrase(proxyResponse.status),
        headers: proxyResponse.headers,
        body: proxyResponse.body,
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
