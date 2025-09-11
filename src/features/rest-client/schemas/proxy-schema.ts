import { object, optional, record, string, number } from 'valibot';

export const ProxyRequestSchema = object({
  url: string(),
  method: string(),
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
