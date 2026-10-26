<<<<<<< HEAD
import { AuthShell } from '@/components/auth/AuthShell';
import { LoginForm } from '@/components/auth/LoginForm';
import { CONTACT, whatsappLink } from '@/lib/constants';

export default function LoginPage({ callbackUrl }: { callbackUrl?: string }) {
  return (
    <AuthShell
      title="Sign in"
      switchText="New to Pure Khetar?"
      switchLabel="Create a free account"
      switchHref="/register"
      headline={
        <>
          Welcome back
          <br />
          to the harvest.
        </>
      }
      intro="Sign in to place orders, follow your deliveries and keep your details saved for next time."
    >
      <LoginForm callbackUrl={callbackUrl} />
      <p className="text-center text-xs text-forest/55">
        Forgot your password?{' '}
        <a
          href={whatsappLink('Hello Pure Khetar! I forgot my password. Please help me get back into my account.')}
          className="font-semibold text-forest hover:text-terracotta"
        >
          Message us on WhatsApp ({CONTACT.phoneDisplay})
        </a>
      </p>
    </AuthShell>
=======
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Eye, EyeOff, ArrowRight, Sprout,
  Mail, Lock, ShieldCheck, Phone
} from 'lucide-react';

/* ─── Floating Label Input ──────────────────────────────────────────── */
function FloatingInput({
  id,
  label,
  type,
  value,
  onChange,
  icon,
  rightElement,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  rightElement?: React.ReactNode;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative flex items-center bg-cream border-2 rounded-2xl transition-all duration-200 ${
          focused ? 'border-forest shadow-sm' : 'border-sage/25 hover:border-sage/50'
        }`}
      >
        {/* Left icon */}
        <div className={`pl-4 flex-shrink-0 transition-colors ${focused ? 'text-forest' : 'text-gray-400'}`}>
          {icon}
        </div>

        {/* Input */}
        <div className="relative flex-1 px-3 pt-5 pb-2">
          <label
            htmlFor={id}
            className={`absolute left-0 text-xs transition-all duration-200 pointer-events-none ${
              floating
                ? 'top-2 text-[10px] font-bold text-forest/70 uppercase tracking-wide'
                : 'top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium'
            }`}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full text-sm text-forest bg-transparent outline-none font-medium"
          />
        </div>

        {/* Right element */}
        {rightElement && <div className="pr-3 flex-shrink-0">{rightElement}</div>}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    // In production: call your auth API here
  };

  return (
    <div className="min-h-screen bg-cream flex">

      {/* ── Left Panel — Farm Visual ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/farm/nethouse-farming.jpeg"
            alt="Kamana organic farm"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-forest/92 via-forest/75 to-forest/50" />
        </div>

        {/* Top logo */}
        <div className="relative z-10 p-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-marigold rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-forest" />
            </div>
            <span className="font-serif text-2xl font-bold text-cream">
              Pure <span className="text-marigold">Khetar</span>
            </span>
          </Link>
        </div>

        {/* Center text */}
        <div className="relative z-10 p-10 space-y-6">
          <div className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sprout className="w-3.5 h-3.5" />
            Kamana Farm · Gujarat
          </div>
          <h2 className="font-serif text-4xl font-bold text-cream leading-tight">
            Welcome back<br />
            to the harvest.
          </h2>
          <p className="text-cream/70 text-base leading-relaxed max-w-sm">
            Sign in to track your orders, manage your weekly baskets, and get exclusive early access to seasonal produce.
          </p>

          {/* Trust points */}
          <div className="space-y-3 pt-2">
            {[
              { icon: <ShieldCheck className="w-4 h-4 text-marigold" />, text: 'Your data is never shared or sold' },
              { icon: <Leaf className="w-4 h-4 text-marigold" />, text: 'Exclusive member discounts on seasonal produce' },
              { icon: <Phone className="w-4 h-4 text-marigold" />, text: 'Direct WhatsApp support from the farm team' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-cream/80">
                {icon}
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 p-10 grid grid-cols-3 gap-6 border-t border-white/10">
          {[
            { num: '50+', label: 'Years of Farming' },
            { num: '0%', label: 'Chemical Residue' },
            { num: '12h', label: 'Farm to Door' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-serif text-2xl font-bold text-marigold">{num}</p>
              <p className="text-[11px] text-cream/50 font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel — Login Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-marigold" />
              </div>
              <span className="font-serif text-xl font-bold text-forest">
                Pure <span className="text-terracotta">Khetar</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div>
            <h1 className="font-serif text-3xl font-bold text-forest">Sign In</h1>
            <p className="text-gray-500 text-sm mt-1.5">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-forest hover:text-terracotta transition-colors">
                Create one free →
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3">
            <button className="flex items-center justify-center gap-3 bg-white border-2 border-sage/20 text-forest py-3.5 rounded-2xl font-semibold text-sm hover:border-forest/30 hover:shadow-card transition-all duration-200">
              {/* Google icon */}
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-sage/20" />
            <span className="text-xs text-gray-400 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-sage/20" />
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              id="login-email"
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              icon={<Mail className="w-4 h-4" />}
              autoComplete="email"
            />

            <FloatingInput
              id="login-password"
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={setPassword}
              icon={<Lock className="w-4 h-4" />}
              autoComplete="current-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="p-1 text-gray-400 hover:text-forest transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs text-red-500 font-medium flex items-center gap-1.5 bg-red-50 border border-red-100 px-3 py-2.5 rounded-xl"
                >
                  ⚠️ {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs font-semibold text-forest/60 hover:text-forest transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full flex items-center justify-center gap-2 bg-forest text-cream py-4 rounded-2xl font-bold text-sm hover:bg-forest-l transition-all shadow-organic hover:shadow-organic-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-cream/30 border-t-cream rounded-full"
                  />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Terms */}
          <p className="text-center text-[11px] text-gray-400 leading-relaxed">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-forest transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-forest transition-colors">Privacy Policy</Link>.
            <br />Pure Khetar never shares your data.
          </p>
        </motion.div>
      </div>
    </div>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  );
}
