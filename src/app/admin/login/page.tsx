'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const result = await signIn('credentials', {
      email: String(form.get('email')),
      password: String(form.get('password')),
      redirect: false,
      callbackUrl: '/admin',
    });
    if (result?.ok) window.location.href = '/admin';
    else setError('Invalid administrator credentials');
    setLoading(false);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-cream px-4">
      <form method="post" onSubmit={submit} className="w-full max-w-md rounded-[2rem] border border-sage/15 bg-white p-7 shadow-natural-lg sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-terracotta">Pure Khetar</p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-forest">Administrator access</h1>
        <div className="mt-7 space-y-4">
          <label className="block text-sm font-semibold text-forest">Email<input name="email" type="email" required autoComplete="username" className="mt-2 min-h-12 w-full rounded-xl border border-sage/25 px-4 outline-none focus:border-forest" /></label>
          <label className="block text-sm font-semibold text-forest">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-xl border border-sage/25 px-4 outline-none focus:border-forest" /></label>
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <button disabled={loading} className="mt-6 min-h-12 w-full rounded-full bg-forest px-5 text-sm font-bold text-white disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in securely'}</button>
      </form>
    </main>
  );
}
