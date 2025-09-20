import type { NextRequest } from 'next/server';

import { getTranslations } from 'next-intl/server';
import { NextResponse } from 'next/server';
import { parse } from 'valibot';

import { ProxyRequestSchema } from '@/features/rest-client/schemas/proxy-schema';

export async function POST(request: NextRequest) {
  let url = '';
  const t = await getTranslations('Errors');

  try {
    const data: unknown = await request.json();
    const parsed = parse(ProxyRequestSchema, data);

    url = parsed.url;
    const { method, headers, body } = parsed;

    const response = await fetch(url, {
      method,
      headers,
      body: body ?? undefined,
    });

    const responseBody = await response.text();

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseBody,
    });
  } catch (error) {
    let errorMessage = 'Unknown error';

    if (error instanceof Error) {
      const { message } = error;

      if (message.includes('Invalid URL')) {
        errorMessage = t('invalidUrl');
      } else if (message.includes('fetch') || message.includes('ENOTFOUND')) {
        errorMessage = t('dnsResolution', { url });
      } else if (message.includes('ByteString')) {
        errorMessage = t('invalidHeaders');
      } else if (message.includes('ECONNREFUSED')) {
        errorMessage = t('connectionRefused');
      } else if (message.includes('ETIMEDOUT')) {
        errorMessage = t('timeout');
      } else if (message.includes('ECONNRESET')) {
        errorMessage = t('connectionReset');
      } else if (message.includes('CERT_HAS_EXPIRED')) {
        errorMessage = t('sslExpired');
      } else {
        errorMessage = t('unknown');
      }
    }

    return NextResponse.json({
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      body: '',
      error: errorMessage,
    });
  }
}
