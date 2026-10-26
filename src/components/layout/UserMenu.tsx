'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Package, User } from 'lucide-react';

/** "Sign in" link for visitors, avatar dropdown for signed-in customers. */
export function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (status === 'loading') {
    return <span aria-hidden className="hidden h-10 w-10 animate-pulse rounded-full bg-sage/15 sm:block" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="hidden items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-semibold text-forest/80 transition-colors hover:bg-forest/5 hover:text-forest sm:flex"
      >
        <User className="h-4 w-4" aria-hidden />
        Sign in
      </Link>
    );
  }

  const initial = (session.user.name ?? session.user.email ?? '?').trim().charAt(0).toUpperCase();

  return (
    <div ref={wrapper} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold font-serif text-base font-bold text-forest shadow-sm transition hover:shadow-glow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
      >
        {initial}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-3 w-60 rounded-2xl border border-sage/20 bg-white p-2 shadow-organic-lg"
          >
            <div className="border-b border-sage/15 px-3 pb-2.5 pt-2">
              <p className="truncate text-sm font-bold text-forest">{session.user.name}</p>
              <p className="truncate text-xs text-forest/55">{session.user.email}</p>
            </div>
            <Link
              role="menuitem"
              href="/account"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-forest hover:bg-forest/5"
            >
              <Package className="h-4 w-4" aria-hidden />
              My account & orders
            </Link>
            <button
              role="menuitem"
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-forest hover:bg-forest/5"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
