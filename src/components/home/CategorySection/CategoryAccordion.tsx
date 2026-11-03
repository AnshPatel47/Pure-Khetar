'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SmartImage } from '@/components/ui/SmartImage';
import type { CategorySummary } from '@/types/category';

export function CategoryAccordion({ categories }: { categories: CategorySummary[] }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const visible = hovered ?? selected;

  return (
    <motion.ul
      initial="hidden"
      animate="show"
      className="flex h-[410px] gap-3 sm:h-[440px] lg:h-[420px]"
      aria-label="Product categories"
      onMouseLeave={() => setHovered(null)}
    >
      {categories.slice(0, 3).map((category, index) => {
        const open = visible === index;
        return (
          <motion.li
            key={category.id}
            layout
            onMouseEnter={() => setHovered(index)}
            className={`relative min-w-0 overflow-hidden rounded-2xl border border-white/60 bg-forest shadow-card transition-[flex] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${open ? 'flex-[4]' : 'flex-[1]'}`}
          >
            <Link
              href={`/shop?category=${category.slug}`}
              onClick={() => setSelected(index)}
              className="group absolute inset-0 block outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2"
              aria-label={`Shop ${category.name}`}
            >
              {category.image && (
                <SmartImage
                  src={category.image}
                  alt=""
                  fill
                  sizes={open ? '(min-width: 1024px) 48vw, 70vw' : '(min-width: 1024px) 12vw, 20vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/25 to-transparent" />

              {open ? (
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl font-bold text-cream sm:text-2xl">{category.name}</h3>
                    <p className="mt-1 max-w-[28rem] text-xs leading-relaxed text-cream/80 sm:text-sm">
                      {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                      {category.description ? ` · ${category.description}` : ''}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marigold text-forest shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                </div>
              ) : (
                <span className="absolute bottom-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-cream/95 text-forest shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5 group-hover:hidden" aria-hidden />
                  <ArrowUpRight className="hidden h-5 w-5 group-hover:block" aria-hidden />
                </span>
              )}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
