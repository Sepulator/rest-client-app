import type { HttpMethod, ResponseData } from '@/types/http-request';

export const HTTP_METHODS: readonly HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export const DEFAULT_URL = 'https://jsonplaceholder.typicode.com/posts/1';

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
