import { type NextRequest, NextResponse } from 'next/server';

import { betterFetch } from '@better-fetch/fetch';
import type { Session } from 'better-auth/types';

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|auth/login|auth/register|auth/reset-password|auth/forgot-password|auth/otp-email-verification|_next/static|_next/image|favicon.ico).*)',
  ],
};
