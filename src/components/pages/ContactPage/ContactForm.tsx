'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { Field, inputClass } from '@/components/checkout/Field';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), phone: form.get('phone'), email: form.get('email') || `${Date.now()}@website.pure-khetar`, subject: 'Website contact enquiry', message: form.get('message') }) });
    if (response.ok) { setStatus('sent'); event.currentTarget.reset(); } else setStatus('error');
  }
  return (
    <section className="rounded-3xl border border-sage/15 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-5"><p className="text-xs font-bold uppercase tracking-widest text-marigold">Send an enquiry</p><h2 className="mt-1 font-serif text-2xl font-bold text-forest">How can we help?</h2></div>
      <form className="space-y-4" onSubmit={submit}>
        <Field label="Full name *"><input className={inputClass} name="name" autoComplete="name" placeholder="Your name" required /></Field>
        <Field label="Mobile number *"><input className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="98765 43210" required /></Field>
        <Field label="Email address"><input className={inputClass} name="email" type="email" autoComplete="email" placeholder="you@example.com" /></Field>
        <Field label="Message *"><textarea className={`${inputClass} min-h-28 resize-y`} name="message" placeholder="Tell us what you need" required /></Field>
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream transition hover:bg-forest-l"><Send className="h-4 w-4" />{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
        {status === 'sent' && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">Your enquiry was sent successfully.</p>}
        {status === 'error' && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">We could not send your enquiry. Please try again.</p>}
      </form>
    </section>
  );
}
