import { object, optional, record, string, number, picklist } from 'valibot';

import { HTTP_METHODS } from '@/features/rest-client/constants/http-request';

export const HeadersSchema = record(string(), string());

export const ProxyRequestSchema = object({
  url: string(),
  method: picklist(HTTP_METHODS),
  headers: HeadersSchema,
  body: optional(string()),
});

export const ProxyResponseSchema = object({
  status: number(),
  statusText: string(),
  headers: HeadersSchema,
  body: string(),
  error: optional(string()),
});
