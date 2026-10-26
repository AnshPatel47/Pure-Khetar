'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sprout } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import type { NavItem } from '@/data/navigation';

interface MegaMenuProps {
  item: NavItem;
  onNavigate: () => void;
}

/** Dropdown panel for nav items that have children (Shop, Our Farm). */
export function MegaMenu({ item, onNavigate }: MegaMenuProps) {
  if (!item.children) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3"
    >
      <div className="glass-cream rounded-2xl border border-sage/20 p-3 shadow-organic-lg">
        <ul className="grid gap-1">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                onClick={onNavigate}
                className="group/item flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-forest/5 focus-visible:bg-forest/5 focus-visible:outline-none"
              >
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sage/10 text-forest">
                  {child.image ? (
                    <SmartImage
                      src={child.image}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover transition-transform duration-300 group-hover/item:scale-110"
                    />
                  ) : (
                    <Sprout className="h-5 w-5" aria-hidden />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-forest transition-colors group-hover/item:text-terracotta">
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="mt-0.5 block truncate text-[11px] text-forest/55">{child.description}</span>
                  )}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-sage opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-2 border-t border-sage/15 pt-2">
          <Link
            href={item.href}
            onClick={onNavigate}
            className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-forest transition-colors hover:text-terracotta"
          >
            <Sprout className="h-3.5 w-3.5" aria-hidden />
            View all {item.label.toLowerCase()}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
