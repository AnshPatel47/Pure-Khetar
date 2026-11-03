'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { NAV_ITEMS, isActivePath } from '@/data/navigation';
import { cn } from '@/lib/utils';

interface NavLinksProps {
  /** True when the navbar has scrolled into its cream glass mode. */
  scrolled?: boolean;
}

/**
 * Desktop navigation.
 *
 * Single indicator system: the ACTIVE page gets ONE sliding green underline
 * (layoutId="nav-indicator") that animates between items.
 * Hover does NOT draw a line — it only changes text colour.
 */
export function NavLinks({ scrolled = true }: NavLinksProps) {
  const pathname  = usePathname();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<number>();

  useEffect(() => setOpenLabel(null), [pathname]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const open = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenLabel(label);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenLabel(null), 120);
  };

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-0.5 lg:gap-1">
        {NAV_ITEMS.map((item) => {
          const active  = isActivePath(pathname, item.href);
          const hasMenu = Boolean(item.children);
          const expanded = openLabel === item.label;

          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => hasMenu && open(item.label)}
              onMouseLeave={closeSoon}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpenLabel(null);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setOpenLabel(null);
              }}
            >
              <div className="relative flex items-center">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    // Base styles
                    'group relative flex items-center rounded-lg py-2.5 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
                    hasMenu ? 'pl-3.5 pr-1' : 'px-3.5',
                    // Transparent navbar: text is cream; after scroll: forest
                    scrolled
                      ? active
                        ? 'text-forest'
                        : 'text-forest/70 hover:text-forest'
                      : active
                        ? 'text-forest'
                        : 'text-forest/80 hover:text-forest',
                    // NO hover underline — only a subtle text colour lift
                  )}
                >
                  {item.label}

                  {!active && (
                    <motion.span
                      className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-sage transition-transform duration-300 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  )}

                  {/* Badge (e.g. "New") */}
                  {item.badge && (
                    <span className="absolute -right-0.5 -top-1 rounded-full bg-terracotta px-1.5 py-0.5 text-[9px] font-bold leading-none text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}

                  {/* Active sliding indicator — ONE per nav, slides between active items */}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={cn(
                        'absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full',
                        'bg-forest',
                      )}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>

                {hasMenu && (
                  <button
                    type="button"
                    aria-label={`${item.label} menu`}
                    aria-haspopup="true"
                    aria-expanded={expanded}
                    onClick={() => (expanded ? setOpenLabel(null) : open(item.label))}
                    className={cn(
                      'rounded-xl py-2.5 pl-0.5 pr-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest',
                      scrolled ? 'text-forest/60' : 'text-forest/70 hover:text-forest',
                    )}
                  >
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')} />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {hasMenu && expanded && <MegaMenu item={item} onNavigate={() => setOpenLabel(null)} />}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

