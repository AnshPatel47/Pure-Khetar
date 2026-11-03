'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { Container } from '../Container';
import { Logo } from '../Logo';
import { NavLinks } from '../NavLinks';
import { UserMenu } from '../UserMenu';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { whatsappLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Heavy panels only downloaded when first needed.
const loadSearch    = () => import('../SearchOverlay').then((m) => m.SearchOverlay);
const loadMobileNav = () => import('../MobileNav').then((m) => m.MobileNav);
const SearchOverlay = dynamic(loadSearch,    { ssr: false });
const MobileNav     = dynamic(loadMobileNav, { ssr: false });

/** Real WhatsApp logo SVG. */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zm-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Navbar() {
  const { count, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 60));

  // Sync on mount (handles page-refresh mid-scroll).
  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 60);
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => window.removeEventListener('scroll', sync);
  }, []);

  // Ctrl/⌘ + K or "/" opens search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input, textarea, select, [contenteditable="true"]');
      if (
        ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') ||
        (event.key === '/' && !typing)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {/* ── Navbar wrapper ──────────────────────────────────────────────── */}
      <div
        ref={navRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out',
          scrolled && 'top-3 px-[3vw] sm:px-[5vw]',
        )}
      >
        <motion.header
          layout
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'mx-auto w-full transition-all duration-500 ease-in-out',
            scrolled
              ? [
                  'max-w-[1280px]',
                  'rounded-none overflow-hidden',
                  'border border-forest/10',
                  'bg-[#fffdf7]/95 backdrop-blur-xl',
                  'shadow-[0_6px_18px_rgba(52,67,43,0.10),0_1px_4px_rgba(231,218,181,0.22)]',
                ]
              : [
                  'rounded-none border-b border-forest/15 bg-[#fffdf7]/78 backdrop-blur-md',
                  'shadow-[0_4px_14px_rgba(31,77,46,0.16),0_1px_0_rgba(255,255,255,0.55)_inset]',
                ],
          )}
        >
          <Container className="relative z-10">
            {/* Compact square rail when scrolled */}
            <div
              className={cn(
                'flex items-center justify-between gap-4 transition-all duration-500',
                scrolled ? 'h-[72px]' : 'h-[80px]',
              )}
            >
              <Logo size={scrolled ? 'sm' : 'md'} />

              <NavLinks scrolled={scrolled} />

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Search — no Ctrl K label */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  onPointerEnter={() => void loadSearch()}
                  aria-label="Search produce"
                  className={cn(
                    'flex items-center gap-2 rounded-full p-2.5 transition-colors',
                    scrolled
                      ? 'text-forest/70 hover:bg-forest/5 hover:text-forest lg:border lg:border-sage/25 lg:px-3.5 lg:py-2'
                      : 'text-forest/80 hover:bg-white/60 hover:text-forest lg:border lg:border-forest/10 lg:px-3.5 lg:py-2',
                  )}
                >
                  <Search className="h-[18px] w-[18px]" />
                  <span className="hidden text-xs font-medium lg:inline">Search</span>
                </button>

                {/* WhatsApp with real logo */}
                <Button
                  href={whatsappLink()}
                  variant="whatsapp"
                  size="sm"
                  className="hidden lg:inline-flex"
                  leftIcon={<WhatsAppIcon className="h-3.5 w-3.5" />}
                >
                  WhatsApp
                </Button>

                <UserMenu />

                {/* Cart */}
                <motion.button
                  type="button"
                  onClick={openCart}
                  whileTap={{ scale: 0.92 }}
                  aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream shadow-[0_2px_8px_rgba(31,77,46,0.3)] transition-colors hover:bg-forest-l"
                >
                  <ShoppingBag className="h-[18px] w-[18px]" />
                  <AnimatePresence>
                    {count > 0 && (
                      <motion.span
                        key={count}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                        className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold leading-none text-white"
                      >
                        {count}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Mobile menu trigger */}
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  onPointerEnter={() => void loadMobileNav()}
                  onTouchStart={() => void loadMobileNav()}
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  className={cn(
                    'rounded-xl p-2.5 transition-colors md:hidden',
                    scrolled ? 'text-forest hover:bg-forest/5' : 'text-forest hover:bg-white/60',
                  )}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Container>
          {/* NO scroll-progress line (removed per spec) */}
        </motion.header>
      </div>

      <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{menuOpen   && <MobileNav    onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
