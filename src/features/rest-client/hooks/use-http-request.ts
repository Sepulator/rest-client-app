import { getReasonPhrase } from 'http-status-codes';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { parse } from 'valibot';

import type { Header, ResponseData } from '@/types/http-request';

import { responseData } from '@/features/rest-client/constants/http-request';
import { ProxyResponseSchema } from '@/features/rest-client/schemas/proxy-schema';
import { getMethodFromParams, getUrlFromParams } from '@/features/rest-client/utils/get-parameters';
import { generateRouteUrl } from '@/features/rest-client/utils/route-generator';

const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);

    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

export const useHttpRequest = (initialParams?: string[]) => {
  const locale = useLocale();
  const [method, setMethod] = useState<string>(() => getMethodFromParams(initialParams));
  const [url, setUrl] = useState(() => getUrlFromParams(initialParams));
  const [response, setResponse] = useState<ResponseData | null>(null);

  const executeRequest = async (headers: Header[], body = ''): Promise<string | undefined> => {
    if (!url || !isValidUrl(url)) {
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

      const hasBody = !['GET', 'HEAD'].includes(method) && body.trim().length > 0;
      let requestBody: string | undefined;

      if (hasBody) {
        requestBody = body;
        if (!requestHeaders['Content-Type'] && !requestHeaders['content-type']) {
          requestHeaders['Content-Type'] = 'application/json';
        }
      }

      const requestSize = new TextEncoder().encode(requestBody ?? '').length;

      const result = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, method, headers: requestHeaders, body: requestBody }),
      });

      if (!result.ok) {
        throw new Error(`HTTP ${result.status.toString()}: ${result.statusText}`);
      }

      const data: unknown = await result.json();
      const proxyResponse = parse(ProxyResponseSchema, data);
      const duration = performance.now() - startTime;
      const responseSize = new TextEncoder().encode(proxyResponse.body).length;

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

      return generateRouteUrl(method, url, locale, hasBody ? body : undefined, requestHeaders);
    } catch (error) {
      setResponse({
        ...responseData,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return undefined;
    }
  };

  return {
    method,
    setMethod,
    url,
    setUrl,
    executeRequest,
    response,
  };
};
