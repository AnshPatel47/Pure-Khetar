'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { NAV_ITEMS, isActivePath } from '@/data/navigation';
import { cn } from '@/lib/utils';

/** Desktop navigation with hover, click and keyboard-accessible dropdowns. */
export function NavLinks() {
  const pathname = usePathname();
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const closeTimer = useRef<number>();

  // Close any open menu when the page changes.
  useEffect(() => setOpenLabel(null), [pathname]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const open = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenLabel(label);
  };
  // A short delay stops the menu flickering when the pointer crosses the small gap.
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenLabel(null), 120);
  };

  return (
    <nav aria-label="Main" className="hidden md:block">
      <ul className="flex items-center gap-0.5 lg:gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href);
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
              <div
                className={cn(
                  'relative flex items-center rounded-xl transition-colors',
                  expanded ? 'bg-forest/5' : 'hover:bg-forest/5',
                )}
              >
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex items-center rounded-xl py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold',
                    hasMenu ? 'pl-3.5 pr-1' : 'px-3.5',
                    active ? 'text-forest' : 'text-forest/75 hover:text-forest',
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="absolute -right-0.5 -top-1 rounded-full bg-terracotta px-1.5 py-0.5 text-[9px] font-bold leading-none text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {hasMenu && (
                  <button
                    type="button"
                    aria-label={`${item.label} menu`}
                    aria-haspopup="true"
                    aria-expanded={expanded}
                    onClick={() => (expanded ? setOpenLabel(null) : open(item.label))}
                    className="rounded-xl py-2.5 pl-0.5 pr-2.5 text-forest/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold"
                  >
                    <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', expanded && 'rotate-180')} />
                  </button>
                )}

                {active && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-marigold"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
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
