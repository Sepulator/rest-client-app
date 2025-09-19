import type { Header } from '@/types/http-request';

import { DEFAULT_URL, HTTP_METHODS } from '@/features/rest-client/constants/http-request';

const DEFAULT_HEADER = { id: '1', key: 'Accept', value: '*/*' };

export const getBodyFromParams = (parameters?: string[]): string => {
  if (!parameters?.[2]) {
    return '';
  }

  try {
    return atob(decodeURIComponent(parameters[2]));
  } catch {
    return '';
  }
};

export const getMethodFromParams = (initialParams?: string[]) => {
  if (!initialParams?.[0]) {
    return HTTP_METHODS[0];
  }

  try {
    const method = decodeURIComponent(initialParams[0]).toUpperCase();
    const validMethod = HTTP_METHODS.find((m) => m === method);

    return validMethod ?? HTTP_METHODS[0];
  } catch {
    return HTTP_METHODS[0];
  }
};

export const getUrlFromParams = (initialParams?: string[]) => {
  if (!initialParams?.[1]) {
    return DEFAULT_URL;
  }

  try {
    return atob(decodeURIComponent(initialParams[1]));
  } catch {
    return '';
  }
};

export const getHeadersFromSearchParams = (initialSearchParams?: Record<string, string>): Header[] => {
  if (!initialSearchParams) {
    return [DEFAULT_HEADER];
  }

  const entries = Object.entries(initialSearchParams);

  if (entries.length > 0) {
    return entries.map(([key, value]) => ({
      id: crypto.randomUUID(),
      key,
      value,
    }));
  }

  return [DEFAULT_HEADER];
};
