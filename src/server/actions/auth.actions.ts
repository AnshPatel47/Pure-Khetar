'use server';

import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signIn } from '@/lib/auth';
import { loginSchema, registerSchema } from '@/lib/validations/auth.schema';
import { safeRedirectPath } from '@/lib/utils';
import { createUser, getUserByEmail } from '@/services/user.service';
import type { FormState } from '@/types/forms';

const BCRYPT_ROUNDS = 12;

/** Where to send the visitor after signing in (only ever a path on this site). */
function redirectTarget(formData: FormData): string {
  return safeRedirectPath(formData.get('callbackUrl'), '/account', [headers().get('host')]);
}

export async function loginAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  try {
    await signIn('credentials', {
      ...parsed.data,
      redirectTo: redirectTarget(formData),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        ok: false,
        message:
          error.type === 'CredentialsSignin'
            ? 'Incorrect email or password. Please try again.'
            : 'We could not sign you in right now. Please try again.',
      };
    }
    // A successful sign-in "throws" a redirect — it must be re-thrown so Next.js can follow it.
    throw error;
  }

  return { ok: true };
}

export async function registerAction(_previous: FormState, formData: FormData): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, phone, password } = parsed.data;
  const alreadyRegistered: FormState = {
    ok: false,
    fieldErrors: { email: ['An account with this email already exists. Try signing in instead.'] },
  };

  if (await getUserByEmail(email)) return alreadyRegistered;

  try {
    await createUser({ name, email, phone, passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS) });
  } catch (error) {
    // Two sign-ups with the same email at the same moment.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') return alreadyRegistered;
    console.error('[register] failed:', error);
    return { ok: false, message: 'We could not create your account right now. Please try again.' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: redirectTarget(formData),
    });
  } catch (error) {
    if (error instanceof AuthError) redirect('/login'); // account exists; let them sign in manually
    throw error;
  }

  return { ok: true };
}
