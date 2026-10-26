import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { loginSchema } from './validations/auth.schema';
import { getUserByEmail } from '@/services/user.service';

/**
 * Pre-computed bcrypt hash (cost 12). We compare against it when the email is unknown so
 * "wrong email" and "wrong password" take the same time — this prevents account enumeration.
 */
const DUMMY_HASH = '$2b$12$C8aobiWqPyAPRK1Pg/Xm1.VPNTLCkqlFU.NwQC7JGtFHRzWHfmnli';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = loginSchema.safeParse(raw);
        if (!parsed.success) return null;

        const user = await getUserByEmail(parsed.data.email);
        const passwordMatches = await bcrypt.compare(parsed.data.password, user?.password ?? DUMMY_HASH);
        if (!user || !passwordMatches) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
});
