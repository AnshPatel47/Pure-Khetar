'use client';

import { useFormState } from 'react-dom';
import { Lock, Mail, Phone, User } from 'lucide-react';
import { FloatingInput, PasswordInput } from './FloatingInput';
import { FormAlert } from './FormAlert';
import { SubmitButton } from './SubmitButton';
import { registerAction } from '@/server/actions/auth.actions';
import { initialFormState } from '@/types/forms';

export function RegisterForm({ callbackUrl = '' }: { callbackUrl?: string }) {
  const [state, formAction] = useFormState(registerAction, initialFormState);
  const errors = state.fieldErrors;

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      <FloatingInput name="name" label="Full name" icon={<User />} autoComplete="name" required error={errors?.name?.[0]} />
      <FloatingInput
        name="email"
        type="email"
        label="Email address"
        icon={<Mail />}
        autoComplete="email"
        inputMode="email"
        required
        error={errors?.email?.[0]}
      />
      <FloatingInput
        name="phone"
        type="tel"
        label="Mobile number (optional)"
        icon={<Phone />}
        autoComplete="tel"
        inputMode="tel"
        error={errors?.phone?.[0]}
      />
      <PasswordInput
        name="password"
        label="Password"
        icon={<Lock />}
        autoComplete="new-password"
        required
        error={errors?.password?.[0]}
      />
      <p className="-mt-1.5 px-1 text-xs text-forest/55">At least 8 characters, with a letter and a number.</p>
      <PasswordInput
        name="confirmPassword"
        label="Confirm password"
        icon={<Lock />}
        autoComplete="new-password"
        required
        error={errors?.confirmPassword?.[0]}
      />

      <FormAlert message={state.message} />
      <SubmitButton pendingLabel="Creating your account…">Create account</SubmitButton>
    </form>
  );
}
