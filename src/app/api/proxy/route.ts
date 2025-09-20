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
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
    });
  } catch (error) {
    let errorMessage = 'Unknown error';

    if (error instanceof Error) {
      const { message } = error;

      switch (true) {
        case message.includes('Invalid URL'): {
          errorMessage = t('invalidUrl');
          break;
        }

        case message.includes('fetch') || message.includes('ENOTFOUND'): {
          errorMessage = t('dnsResolution', { url });
          break;
        }

        case message.includes('ByteString'): {
          errorMessage = t('invalidHeaders');
          break;
        }

        case message.includes('ECONNREFUSED'): {
          errorMessage = t('connectionRefused');
          break;
        }

        case message.includes('ETIMEDOUT'): {
          errorMessage = t('timeout');
          break;
        }

        case message.includes('ECONNRESET'): {
          errorMessage = t('connectionReset');
          break;
        }

        case message.includes('CERT_HAS_EXPIRED'): {
          errorMessage = t('sslExpired');
          break;
        }

        default: {
          errorMessage = message;
        }
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
