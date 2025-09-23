import { getReasonPhrase } from 'http-status-codes';
import { parse } from 'valibot';
import { create } from 'zustand';

import type { Header, ResponseData } from '@/types/http-request';

import { responseData } from '@/features/rest-client/constants/http-request';
import { ProxyResponseSchema } from '@/features/rest-client/schemas/proxy-schema';
import {
  getBodyFromParams,
  getHeadersFromSearchParams,
  getMethodFromParams,
  getUrlFromParams,
} from '@/features/rest-client/utils/get-parameters';
import { generateRouteUrl } from '@/utils/route-generator';
import { insertHistory } from '@/utils/supabase/history-insert';

type State = {
  method: string;
  url: string;
  headers: Header[];
  response: ResponseData | null;
  isJsonMode: boolean;
  jsonBody: string;
  textBody: string;
  isLoading: boolean;
};

type StateActions = {
  setMethod: (method: string) => void;
  setUrl: (url: string) => void;
  setHeaders: (headers: Header[]) => void;
  addHeader: () => void;
  updateHeader: (id: string, updates: Partial<Header>) => void;
  removeHeader: (id: string) => void;
  setResponse: (response: ResponseData | null) => void;
  setIsJsonMode: (isJsonMode: boolean) => void;
  setJsonBody: (body: string) => void;
  setTextBody: (body: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetResponse: () => void;
  executeRequest: (
    locale: string,
    replaceVariables: (text: string) => string,
    invalidUrlMessage: string
  ) => Promise<string | undefined>;
  initializeFromParams: (initialParams?: string[], initialSearchParams?: Record<string, string>) => void;
};

type RestClientStore = State & StateActions;

const normalizeUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
};

const isValidUrl = (url: string): boolean => {
  try {
    const normalizedUrl = normalizeUrl(url);
    const parsedUrl = new URL(normalizedUrl);

    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

export const useRestClientStore = create<RestClientStore>((set, get) => ({
  method: 'GET',
  url: '',
  headers: [],
  response: null,
  isJsonMode: true,
  jsonBody: '',
  textBody: '',
  isLoading: false,

  setMethod: (method) => {
    set({ method });
  },

  setUrl: (url) => {
    set({ url: url.trim() });
  },

  setHeaders: (headers) => {
    set({ headers });
  },

  setResponse: (response) => {
    set({ response });
  },

  setIsJsonMode: (isJsonMode) => {
    set({ isJsonMode });
  },

  setJsonBody: (jsonBody) => {
    set({ jsonBody });
  },

  setTextBody: (textBody) => {
    set({ textBody });
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },

  resetResponse: () => {
    set({ response: null });
  },

  addHeader: () => {
    const { headers } = get();

    set({ headers: [...headers, { id: crypto.randomUUID(), key: '', value: '' }] });
  },

  updateHeader: (id, updates) => {
    const { headers } = get();

    set({ headers: headers.map((header) => (header.id === id ? { ...header, ...updates } : header)) });
  },

  removeHeader: (id) => {
    const { headers } = get();

    set({ headers: headers.filter((header) => header.id !== id) });
  },

  executeRequest: async (locale, replaceVariables, invalidUrlMessage) => {
    const { url, method, headers, isJsonMode, jsonBody, textBody } = get();

    if (!isValidUrl(url)) {
      set({
        response: {
          ...responseData,
          error: invalidUrlMessage,
        },
      });

      return;
    }

    set({ isLoading: true });
    const body = isJsonMode ? jsonBody : textBody;
    const timestamp = new Date().toISOString();
    const startTime = performance.now();

    try {
      const requestHeaders = headers.reduce<Record<string, string>>((acc, header) => {
        if (header.key && header.value) {
          acc[header.key.trim()] = header.value.trim();
        }

        return acc;
      }, {});

      const hasBody = !['GET', 'HEAD'].includes(method) && body.trim().length > 0;
      let requestBody: string | undefined;

      if (hasBody) {
        requestBody = body;
        if (!Object.keys(requestHeaders).some((header) => /^content-type$/i.test(header))) {
          requestHeaders['Content-Type'] = isJsonMode ? 'application/json' : 'text/plain';
        }
      }

      const requestSize = new TextEncoder().encode(requestBody ?? '').length;
      const normalizedUrl = normalizeUrl(url);
      const bodyWithVariables = replaceVariables(
        JSON.stringify({ url: normalizedUrl, method, headers: requestHeaders, body: requestBody })
      );

      const result = await fetch('/api/proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyWithVariables,
      });

      const data: unknown = await result.json();
      const proxyResponse = parse(ProxyResponseSchema, data);
      const duration = +(performance.now() - startTime).toFixed(1);
      const responseSize = new TextEncoder().encode(proxyResponse.body).length;

      const dataForSave = {
        status: proxyResponse.status,
        headers: proxyResponse.headers,
        body: proxyResponse.body,
        timestamp,
        duration,
        requestSize,
        responseSize,
      };

      const { error } = await insertHistory({
        ...dataForSave,
        body: requestBody,
        headers: JSON.stringify(requestHeaders),
        id: crypto.randomUUID(),
        error: proxyResponse.error,
        method,
        url,
      });

      if (proxyResponse.error) {
        throw new Error(proxyResponse.error);
      }

      if (!result.ok) {
        throw new Error(`HTTP ${result.status.toString()}: ${result.statusText}`);
      }

      set({
        response: { ...dataForSave, statusText: getReasonPhrase(proxyResponse.status), error: error?.message },
        isLoading: false,
      });

      return generateRouteUrl(method, url, locale, hasBody ? body : undefined, requestHeaders);
    } catch (error) {
      const duration = performance.now() - startTime;
      const requestSize = new TextEncoder().encode(body).length;

      set({
        response: {
          ...responseData,
          error: error instanceof Error ? error.message : 'Unknown error',
          requestSize,
          timestamp,
          duration,
        },
        isLoading: false,
      });

      return;
    }
  },

  initializeFromParams: (initialParams, initialSearchParams) => {
    set({
      method: getMethodFromParams(initialParams),
      url: getUrlFromParams(initialParams),
      headers: getHeadersFromSearchParams(initialSearchParams),
      jsonBody: getBodyFromParams(initialParams),
    });
  },
}));
