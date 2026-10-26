'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Search, X } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { NAV_ITEMS } from '@/data/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { FALLBACK_PRODUCT_IMAGE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import type { ProductSummary } from '@/types/product';

const SUGGESTIONS = NAV_ITEMS.find((item) => item.label === 'Shop')?.children ?? [];

async function fetchProducts(query: string, signal: AbortSignal): Promise<ProductSummary[]> {
  const response = await fetch(`/api/products?q=${encodeURIComponent(query)}&limit=6`, { signal });
  if (!response.ok) throw new Error('Search failed');
  const data = (await response.json()) as { products: ProductSummary[] };
  return data.products;
}

export function SearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const term = useDebounce(query.trim(), 250);

  useLockBodyScroll(true);
  useEscapeKey(true, onClose);
  useEffect(() => inputRef.current?.focus(), []);

  const { data: products, isFetching, isError } = useQuery({
    queryKey: ['product-search', term],
    queryFn: ({ signal }) => fetchProducts(term, signal),
    enabled: term.length >= 2,
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  const searching = term.length >= 2;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Search produce"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[70] flex items-start justify-center bg-forest/40 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-sage/20 bg-cream shadow-organic-lg"
      >
        <form onSubmit={submit} className="flex items-center gap-3 border-b border-sage/15 px-5">
          {isFetching ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin text-sage" />
          ) : (
            <Search className="h-5 w-5 shrink-0 text-sage" />
          )}
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Ringan, Fulawar…"
            aria-label="Search produce"
            className="w-full bg-transparent py-5 text-base text-forest outline-none placeholder:text-forest/40"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-2 text-forest/60 transition hover:bg-forest/5 hover:text-forest"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        <div className="max-h-[50vh] overflow-y-auto p-3">
          {!searching && (
            <>
              <p className="px-3 pb-2 pt-1 text-xs font-semibold text-forest/50">Browse by category</p>
              <ul>
                {SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion.href}>
                    <Link
                      href={suggestion.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-forest transition hover:bg-forest/5"
                    >
                      {suggestion.label}
                      <ArrowRight className="h-4 w-4 text-sage" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {searching && isError && (
            <p className="px-3 py-8 text-center text-sm text-forest/60">Search is unavailable right now. Please try again.</p>
          )}

          {searching && !isError && products && products.length === 0 && !isFetching && (
            <p className="px-3 py-8 text-center text-sm text-forest/60">
              No produce matches “{term}”. Try a different name.
            </p>
          )}

          {searching && products && products.length > 0 && (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-forest/5"
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
                      <SmartImage
                        src={product.images[0] ?? FALLBACK_PRODUCT_IMAGE}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-forest">{product.name}</span>
                      <span className="text-xs text-forest/55">{product.category.name}</span>
                    </span>
                    <span className="text-sm font-bold text-forest">
                      {formatPrice(product.price)}
                      <span className="text-xs font-normal text-forest/50"> / {product.unit}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
