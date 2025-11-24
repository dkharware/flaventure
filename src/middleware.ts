'use server';

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This middleware is no longer needed as there are no protected routes.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}
 
export const config = {
  matcher: [],
}
