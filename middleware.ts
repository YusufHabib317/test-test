// import { type NextRequest, NextResponse } from 'next/server';

// import { betterFetch } from '@better-fetch/fetch';
// import type { Session } from 'better-auth/types';

// export default async function authMiddleware(request: NextRequest) {
//   const { data: session } = await betterFetch<Session>(
//     '/api/auth/get-session',
//     {
//       baseURL: request.nextUrl.origin,
//       headers: {
//         cookie: request.headers.get('cookie') || '',
//       },
//     },
//   );

//   if (!session) {
//     return NextResponse.redirect(new URL('/auth/login', request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/((?!api/auth|auth/login|auth/register|auth/reset-password|auth/forgot-password|auth/otp-email-verification|_next/static|_next/image|favicon.ico).*)',
//   ],
// };
import { type NextRequest, NextResponse } from 'next/server';
import { betterFetch } from '@better-fetch/fetch';
import type { Session } from 'better-auth/types';

export default async function authMiddleware(request: NextRequest) {
  try {
    // Skip middleware for public assets and API routes
    if (
      request.nextUrl.pathname.startsWith('/_next')
      || request.nextUrl.pathname.startsWith('/api/')
    ) {
      return NextResponse.next();
    }

    // Get the session
    const { data: session } = await betterFetch<Session>(
      '/api/auth/get-session',
      {
        baseURL: request.nextUrl.origin,
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') || '',
        },
        // Add timeout to prevent hanging
        timeout: 5000,
      },
    );

    // If no session, redirect to login with return URL
    if (!session) {
      const loginUrl = new URL('/auth/login', request.url);
      // Add the current path as a return URL parameter
      loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);

      const response = NextResponse.redirect(loginUrl);

      // Clear any existing auth cookies
      response.cookies.delete('auth-token');
      // Add security headers
      response.headers.set('x-middleware-cache', 'no-cache');

      return response;
    }

    // User is authenticated, proceed
    const response = NextResponse.next();

    // Add security headers
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');

    return response;
  } catch (error) {
    console.error('Middleware Error:', error);

    // On error, allow access but don't redirect
    // This prevents infinite redirect loops
    const response = NextResponse.next();
    response.headers.set('x-middleware-cache', 'no-cache');
    return response;
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/((?!api/auth|auth/login|auth/register|auth/reset-password|auth/forgot-password|auth/otp-email-verification|_next/static|_next/image|favicon.ico|public/.*|assets/.*).*)$',
  ],
};
