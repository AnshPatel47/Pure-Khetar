'use client';

import { Send } from 'lucide-react';
import { Field, inputClass } from '@/components/checkout/Field';

export function ContactForm() {
  return (
    <section className="rounded-3xl border border-sage/15 bg-white p-5 shadow-card sm:p-6">
      <div className="mb-5"><p className="text-xs font-bold uppercase tracking-widest text-marigold">Send an enquiry</p><h2 className="mt-1 font-serif text-2xl font-bold text-forest">How can we help?</h2></div>
      <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
        <Field label="Full name *"><input className={inputClass} name="name" autoComplete="name" placeholder="Your name" /></Field>
        <Field label="Mobile number *"><input className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="98765 43210" /></Field>
        <Field label="Email address"><input className={inputClass} name="email" type="email" autoComplete="email" placeholder="you@example.com" /></Field>
        <Field label="Message *"><textarea className={`${inputClass} min-h-28 resize-y`} name="message" placeholder="Tell us what you need" /></Field>
        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-cream transition hover:bg-forest-l"><Send className="h-4 w-4" />Send enquiry</button>
      </form>
    </section>
  );
}
