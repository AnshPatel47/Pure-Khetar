'use client';

import { useFormState } from 'react-dom';
import { Lock, Mail } from 'lucide-react';
import { FloatingInput, PasswordInput } from './FloatingInput';
import { FormAlert } from './FormAlert';
import { SubmitButton } from './SubmitButton';
import { loginAction } from '@/server/actions/auth.actions';
import { initialFormState } from '@/types/forms';

export function LoginForm({ callbackUrl = '' }: { callbackUrl?: string }) {
  const [state, formAction] = useFormState(loginAction, initialFormState);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <FloatingInput
        name="email"
        type="email"
        label="Email address"
        icon={<Mail />}
        autoComplete="email"
        inputMode="email"
        required
        error={state.fieldErrors?.email?.[0]}
      />
      <PasswordInput
        name="password"
        label="Password"
        icon={<Lock />}
        autoComplete="current-password"
        required
        error={state.fieldErrors?.password?.[0]}
      />

      <FormAlert message={state.message} />
      <SubmitButton pendingLabel="Signing in…">Sign in</SubmitButton>
    </form>
  );
}
