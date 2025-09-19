import { getReasonPhrase } from 'http-status-codes';
import { useState } from 'react';
import { parse } from 'valibot';

import type { Header, ResponseData } from '@/types/http-request';

import { DEFAULT_URL, HTTP_METHODS, responseData } from '@/features/rest-client/constants/http-request';
import { ProxyResponseSchema } from '@/features/rest-client/schemas/proxy-schema';
import { useReplaceWithVariable } from '@/features/variables/hooks/use-replace-with-variable';

export const useHttpRequest = () => {
  const [method, setMethod] = useState<string>(HTTP_METHODS[0]);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const replaceVariables = useReplaceWithVariable();

  const executeRequest = async (headers: Header[], body = '') => {
    if (!url) {
      return;
    }

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
        if (!Object.keys(requestHeaders).some((header) => /^content-type$/i.test(header))) {
          requestHeaders['Content-Type'] = 'application/json';
        }
      }

      const requestSize = new Blob([requestBody ?? '']).size;
      const bodyWithVariables = replaceVariables(
        JSON.stringify({ url, method, headers: requestHeaders, body: requestBody })
      );

      const result = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyWithVariables,
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
  };
};
