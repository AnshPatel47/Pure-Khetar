import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

// Runs only on the routes below, so every other page stays fast and cacheable.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/account/:path*', '/checkout', '/login', '/register'],
};
