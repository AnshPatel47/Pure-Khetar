import type { NextAuthConfig } from 'next-auth';
import type { Role } from '@prisma/client';

/**
 * Edge-safe Auth.js config (no database / bcrypt imports) so it can run in middleware.
 * The full config with the credentials provider lives in ./auth.ts.
 */
const PROTECTED_PREFIXES = ['/account', '/checkout'];
const AUTH_PAGES = ['/login', '/register'];

export const authConfig = {
  pages: { signIn: '/login' },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 30 },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const path = nextUrl.pathname;

      if (PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) {
        return isLoggedIn; // false → Auth.js redirects to /login?callbackUrl=…
      }
      if (AUTH_PAGES.includes(path) && isLoggedIn) {
        return Response.redirect(new URL('/account', nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as Role | undefined) ?? 'USER';
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
