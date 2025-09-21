import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';

import { routing } from '@/i18n/routing';
import { updateSession } from '@/utils/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  return await updateSession(request, response);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
