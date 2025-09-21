import type { NextRequest } from 'next/server';

import { createServerClient } from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = ['/variables', '/history', '/client'];
const authRoutes = ['/login', '/sign-up'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return intlMiddleware(request);
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';

  if (session && authRoutes.some((route) => pathWithoutLocale.startsWith(route))) {
    const url = request.nextUrl.clone();

    url.pathname = pathname.replace(/\/(login|sign-up).*/, '/');

    return NextResponse.redirect(url);
  }

  if (!session && protectedRoutes.some((route) => pathWithoutLocale.startsWith(route))) {
    const url = request.nextUrl.clone();

    url.pathname = pathname.replace(/\/(variables|history|client).*/, '/login');

    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
