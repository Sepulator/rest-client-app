import type { ResponseData } from '@/types/http-request';

export const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts/1';

export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const;

export const responseData: ResponseData = {
  body: '',
  headers: {},
  status: 500,
  statusText: 'Internal Server Error',
  timestamp: '',
  duration: 0,
  requestSize: 0,
  responseSize: 0,
};
