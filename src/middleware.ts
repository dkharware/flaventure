import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { db } from './lib/db';
 
export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-is-authenticated', 'false');

  // If there's a session cookie, verify the user exists
  if (session?.value) {
    const user = await db.getUserById(session.value);
    if (user) {
      requestHeaders.set('x-is-authenticated', 'true');
    }
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
