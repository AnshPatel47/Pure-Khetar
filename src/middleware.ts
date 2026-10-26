<<<<<<< HEAD
import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

// Runs only on the routes below, so every other page stays fast and cacheable.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/account/:path*', '/checkout', '/login', '/register'],
};
=======
import { NextResponse } from 'next/server';

export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
