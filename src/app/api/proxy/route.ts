import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { parse } from 'valibot';

import { ProxyRequestSchema } from '@/features/rest-client/schemas/proxy-schema';

export async function POST(request: NextRequest) {
  try {
    const data: unknown = await request.json();
    const { url, method, headers, body } = parse(ProxyRequestSchema, data);

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
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
