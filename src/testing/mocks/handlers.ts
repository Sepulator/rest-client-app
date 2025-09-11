import { http, HttpResponse } from 'msw';
import { parse } from 'valibot';

import { ProxyRequestSchema } from '@/features/rest-client/schemas/proxy-schema';

export const handlers = [
  http.post('/api/proxy', async ({ request }) => {
    const data: unknown = await request.json();
    const { url, method } = parse(ProxyRequestSchema, data);

    if (url.includes('jsonplaceholder')) {
      return HttpResponse.json({
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: 1, title: 'Mock Post', text: 'Welcome home!' }),
      });
    }

    if (url.includes('error')) {
      return HttpResponse.json({
        error: 'Network error',
        headers: {},
        status: 500,
        statusText: 'Internal Server Error',
        body: '',
      });
    }

    return HttpResponse.json({
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ message: 'Mock response', method }),
    });
  }),
];
