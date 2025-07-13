'use server';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  
  // If there's no session, redirect to login page
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Add user ID to request headers for use in server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', session.value);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
 
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/cover-letter-editor/:path*',
  ],
}
