'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag, Search, Menu, X, ChevronDown,
  PhoneCall, Leaf, Sprout, ArrowRight
} from 'lucide-react';
import { NAV_ITEMS } from '@/data/navigation';
import { useCartStore } from '@/store/cart.store';

/* ─── Announcement Ticker ──────────────────────────────────────────── */
const ANNOUNCEMENTS = [
  '🌿 Free delivery on orders above ₹499 — Kamana Farm, Gujarat',
  '🧺 Morning Harvest Window: 5 AM – 7 AM daily',
  '✅ 0% Chemical Residue — Lab Verified Every Batch',
  '🐄 Nourished with Gir Cow A2 Vedic Manure',
];

function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ANNOUNCEMENTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-forest text-cream text-[11px] font-medium py-2 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="text-center tracking-wide"
          >
            {ANNOUNCEMENTS[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── MegaMenu Dropdown ─────────────────────────────────────────────── */
function MegaMenu({ item }: { item: (typeof NAV_ITEMS)[0] }) {
  if (!item.children) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 glass-cream rounded-2xl shadow-organic-lg border border-sage/20 p-3 z-50"
    >
      {/* top arrow */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cream rotate-45 border-l border-t border-sage/20 rounded-sm" />

      <div className="grid gap-1">
        {item.children.map((child) => (
          <Link
            key={child.label}
            href={child.href}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-forest/5 transition-colors group/item"
          >
            {child.image ? (
              <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-sage/10">
                <Image
                  src={child.image}
                  alt={child.label}
                  fill
                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-lg bg-sage/10 flex items-center justify-center text-forest text-base flex-shrink-0">
                🌿
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-forest group-hover/item:text-terracotta transition-colors line-clamp-1">
                {child.label}
              </p>
              {child.description && (
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                  {child.description}
                </p>
              )}
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-sage opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all ml-auto flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-2 pt-2 border-t border-sage/15">
        <Link
          href={item.href}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-forest hover:text-terracotta transition-colors py-1.5"
        >
          <Sprout className="w-3.5 h-3.5" />
          View All {item.label}
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────────────── */
export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { totalItems, setIsOpen } = useCartStore();

  /* Scroll-aware shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Focus search on open */
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100);
  }, [searchOpen]);

  const cartCount = totalItems();

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-lg shadow-card border-b border-sage/15'
            : 'bg-cream/90 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-forest rounded-lg flex items-center justify-center shadow-sm"
              >
                <Leaf className="w-4 h-4 text-marigold" />
              </motion.div>
              <div>
                <span className="font-serif text-xl font-bold text-forest tracking-tight leading-none block">
                  Pure <span className="text-terracotta">Khetar</span>
                </span>
                <span className="text-[10px] text-sage font-medium leading-none hidden sm:block">
                  Kamana Farm · Gujarat
                </span>
              </div>
              <span className="hidden sm:inline-block text-[10px] bg-marigold/15 text-marigold border border-marigold/25 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ml-1">
                Organic
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      activeDropdown === item.label
                        ? 'text-forest bg-forest/5'
                        : 'text-forest/80 hover:text-forest hover:bg-forest/5'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 text-[9px] bg-terracotta text-white px-1.5 py-0.5 rounded-full font-bold leading-none shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <MegaMenu item={item} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence mode="wait">
                {searchOpen ? (
                  <motion.div
                    key="search-input"
                    initial={{ opacity: 0, width: 40 }}
                    animate={{ opacity: 1, width: 200 }}
                    exit={{ opacity: 0, width: 40 }}
                    className="hidden sm:flex items-center bg-forest/5 border border-sage/30 rounded-full px-3 overflow-hidden"
                  >
                    <Search className="w-4 h-4 text-sage flex-shrink-0" />
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search produce…"
                      className="flex-1 bg-transparent text-sm text-forest placeholder-sage/70 outline-none py-2 px-2"
                      onBlur={() => setSearchOpen(false)}
                    />
                  </motion.div>
                ) : (
                  <motion.button
                    key="search-btn"
                    onClick={() => setSearchOpen(true)}
                    className="hidden sm:flex p-2.5 text-forest/70 hover:text-forest hover:bg-forest/5 rounded-full transition-colors"
                    aria-label="Search"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="w-4.5 h-4.5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 bg-[#25D366]/10 text-[#128C4A] border border-[#25D366]/30 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-[#25D366]/20 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Cart */}
              <motion.button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 bg-forest text-cream rounded-full shadow-organic hover:bg-forest-l transition-colors flex items-center justify-center"
                aria-label={`Shopping Cart — ${cartCount} items`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-terracotta text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold leading-none px-1"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="md:hidden p-2.5 text-forest hover:bg-forest/5 rounded-xl transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X className="w-5 h-5" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu className="w-5 h-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-cream border-t border-sage/15 overflow-hidden"
            >
              <div className="px-4 py-5 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => !item.children && setMobileMenuOpen(false)}
                        className="flex-1 text-sm font-bold text-forest py-3 flex items-center gap-2"
                      >
                        {item.label}
                        {item.badge && (
                          <span className="text-[9px] bg-terracotta text-white px-1.5 py-0.5 rounded-full font-bold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                      {item.children && (
                        <button
                          onClick={() =>
                            setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                          }
                          className="p-2 text-sage"
                          aria-label="Expand submenu"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpanded === item.label ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {item.children && mobileExpanded === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-3 border-l-2 border-sage/20 ml-2 mb-2"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 py-2.5 text-sm text-forest/70 hover:text-forest font-medium"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-sage/15 space-y-2">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C4A] border border-[#25D366]/30 px-4 py-3 rounded-full text-sm font-bold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <PhoneCall className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                  <Link
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 bg-forest text-cream px-4 py-3 rounded-full text-sm font-bold"
                  >
                    <Sprout className="w-4 h-4" />
                    Explore Fresh Harvest
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}