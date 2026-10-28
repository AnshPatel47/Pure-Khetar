'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { AnnouncementBar } from '../AnnouncementBar';
import { Container } from '../Container';
import { Logo } from '../Logo';
import { NavLinks } from '../NavLinks';
import { UserMenu } from '../UserMenu';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { whatsappLink } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { MessageCircle } from 'lucide-react';

// These two are only downloaded the first time they are needed.
const loadSearch = () => import('../SearchOverlay').then((m) => m.SearchOverlay);
const loadMobileNav = () => import('../MobileNav').then((m) => m.MobileNav);
const SearchOverlay = dynamic(loadSearch, { ssr: false });
const MobileNav = dynamic(loadMobileNav, { ssr: false });

export function Navbar() {
  const { count, openCart } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // `shrunk` means user has scrolled past the hero — bar stays visible but compact
  const [shrunk, setShrunk] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Full-screen when user lands; compact (but always visible) after scrolling.
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50);
    setShrunk(y > 50);
  });

  useEffect(() => {
    const updateScrolledState = () => {
      const isScrolled = window.scrollY > 50;
      navRef.current?.classList.toggle('is-scrolled', isScrolled);
      setShrunk(isScrolled);
      setScrolled(isScrolled);
    };
    updateScrolledState();
    window.addEventListener('scroll', updateScrolledState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolledState);
  }, []);

  // Ctrl/⌘ + K or "/" opens search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.matches('input, textarea, select, [contenteditable="true"]');
      if (((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !typing)) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <div
        ref={navRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ease-in-out',
          shrunk && 'top-3 px-[3vw] sm:px-[5vw]',
        )}
      >
      {/* Announcement bar only shows when NOT scrolled */}
      <AnimatePresence initial={false}>
        {!shrunk && (
          <motion.div
            key="announcement"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <AnnouncementBar />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        layout
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'mx-auto w-full max-w-[1280px] overflow-hidden border transition-all duration-[400ms] ease-in-out',
          scrolled
            ? 'is-scrolled rounded-[999px] border-[#efe8d6] bg-[#fffdf7]/95 shadow-[0_10px_32px_rgba(52,67,43,0.16),0_2px_12px_rgba(231,218,181,0.45)] backdrop-blur-xl'
            : 'rounded-none border-[#efe8d6]/80 bg-[#fffdf7]/95 shadow-[0_4px_24px_rgba(231,218,181,0.38)] backdrop-blur-md',
        )}
      >
        <Container>
          {/* Height transitions from 80px (full) to 60px (shrunk) */}
          <div
            className={cn(
              'flex items-center justify-between gap-4 transition-all duration-350',
              shrunk ? 'h-[64px]' : 'h-[88px]',
            )}
          >
            {/* Logo shrinks slightly too */}
            <Logo
              showTagline={!shrunk}
              size={shrunk ? 'sm' : 'md'}
            />

            <NavLinks />

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                onPointerEnter={() => void loadSearch()}
                aria-label="Search produce"
                className={cn(
                  'flex items-center gap-2 rounded-full p-2.5 text-forest/70 transition-colors hover:bg-forest/5 hover:text-forest lg:border lg:border-sage/25 lg:px-3.5 lg:py-2',
                  shrunk && 'lg:py-1.5',
                )}
              >
                <Search className="h-[18px] w-[18px]" />
                <span className="hidden text-xs font-medium text-forest/50 lg:inline">Search</span>
                <kbd className="hidden rounded border border-sage/30 bg-white px-1.5 py-0.5 font-sans text-[10px] font-semibold text-forest/50 xl:inline">
                  Ctrl K
                </kbd>
              </button>

              <Button
                href={whatsappLink()}
                variant="whatsapp"
                size="sm"
                className="hidden lg:inline-flex"
                leftIcon={<MessageCircle className="h-3.5 w-3.5" aria-hidden />}
              >
                WhatsApp
              </Button>

              <UserMenu />

              <motion.button
                type="button"
                onClick={openCart}
                whileTap={{ scale: 0.92 }}
                aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest text-cream shadow-organic transition-colors hover:bg-forest-l"
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

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                onPointerEnter={() => void loadMobileNav()}
                onTouchStart={() => void loadMobileNav()}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="rounded-xl p-2.5 text-forest transition-colors hover:bg-forest/5 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>

        {/* Reading-progress line */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-marigold to-terracotta"
        />
      </motion.header>
      </div>

      <AnimatePresence>{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{menuOpen && <MobileNav onClose={() => setMenuOpen(false)} />}</AnimatePresence>
    </>
  );
}
