import type { Header } from '@/types/http-request';

import { DEFAULT_URL, HTTP_METHODS } from '@/features/rest-client/constants/http-request';

const MIN_PARAMS_FOR_URL = 2;
const MIN_PARAMS_FOR_BODY = 3;

export const getBodyFromParams = (parameters?: string[]): string => {
  if (!parameters || parameters.length < MIN_PARAMS_FOR_BODY) {
    return '';
  }

  try {
    return parameters[2] ? String(JSON.parse(atob(decodeURIComponent(parameters[2])))) : '';
  } catch {
    return '';
  }
};

export const getMethodFromParams = (initialParams?: string[]) => {
  if (initialParams && initialParams.length > 0) {
    try {
      return decodeURIComponent(initialParams[0]).toUpperCase();
    } catch {
      return HTTP_METHODS[0];
    }
  }

  return HTTP_METHODS[0];
};

export const getUrlFromParams = (initialParams?: string[]) => {
  if (initialParams && initialParams.length >= MIN_PARAMS_FOR_URL) {
    try {
      return atob(decodeURIComponent(initialParams[1]));
    } catch {
      return DEFAULT_URL;
    }
  }

  return DEFAULT_URL;
};

export const getHeadersFromSearchParams = (initialSearchParams?: Record<string, string>): Header[] => {
  if (initialSearchParams && Object.keys(initialSearchParams).length > 0) {
    return Object.entries(initialSearchParams).map(([key, value]) => ({
      id: crypto.randomUUID(),
      key,
      value,
    }));
  }

  return [{ id: '1', key: 'Accept', value: '*/*' }];
};
