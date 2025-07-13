'use server';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const requestHeaders = new Headers(request.headers);

  if (session?.value) {
    requestHeaders.set('x-user-id', session.value);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
 
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
