import type { ResponseData } from '@/types/http-request';

export const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts/1';

export const HTTP_METHODS = ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export const responseData: ResponseData = {
  body: '',
  headers: {},
  status: 500,
  statusText: '',
  timestamp: '',
  duration: 0,
  requestSize: 0,
  responseSize: 0,
};
