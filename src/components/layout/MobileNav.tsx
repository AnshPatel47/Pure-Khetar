'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Sprout, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { NAV_ITEMS, isActivePath } from '@/data/navigation';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/utils';

export function MobileNav({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState<string | null>(null);

  useLockBodyScroll(true);
  useEscapeKey(true, onClose);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] flex flex-col bg-cream md:hidden"
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-sage/15 px-4">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-xl p-2.5 text-forest transition hover:bg-forest/5"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="divide-y divide-sage/10">
          {NAV_ITEMS.map((item, index) => {
            const isOpen = expanded === item.label;
            const active = isActivePath(pathname, item.href);

            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + index * 0.04, duration: 0.3 }}
              >
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex flex-1 items-center gap-2 py-4 font-serif text-xl font-bold',
                      active ? 'text-terracotta' : 'text-forest',
                    )}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full bg-terracotta px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} links`}
                      className="p-3 text-sage"
                    >
                      <ChevronDown className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')} />
                    </button>
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {item.children && isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center gap-3 py-2.5 pl-2 text-base font-medium text-forest/75"
                          >
                            <Sprout className="h-4 w-4 text-sage" aria-hidden />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div className="shrink-0 space-y-2.5 border-t border-sage/15 bg-white/60 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {session?.user ? (
          <div className="grid grid-cols-2 gap-2.5">
            <Button href="/account" variant="outline" onClick={onClose}>
              My account
            </Button>
            <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
              Sign out
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <Button href="/login" variant="outline" onClick={onClose}>
              Sign in
            </Button>
            <Button href="/register" variant="outline" onClick={onClose}>
              Create account
            </Button>
          </div>
        )}
        <WhatsAppButton fullWidth />
        <Button href="/shop" fullWidth onClick={onClose} leftIcon={<Sprout className="h-4 w-4" />}>
          Shop fresh produce
        </Button>
      </div>
    </motion.div>
  );
}
