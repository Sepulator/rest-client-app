import { object, optional, record, string, number, picklist } from 'valibot';

import { HTTP_METHODS } from '@/features/rest-client/constants/http-request';

export const ProxyRequestSchema = object({
  url: string(),
  method: picklist(HTTP_METHODS),
  headers: record(string(), string()),
  body: optional(string()),
});

export const ProxyResponseSchema = object({
  status: number(),
  statusText: string(),
  headers: record(string(), string()),
  body: string(),
  error: optional(string()),
});
