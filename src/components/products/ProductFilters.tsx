'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Search, X } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';
import type { CategorySummary } from '@/types/category';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
] as const;

interface ProductFiltersProps {
  categories: CategorySummary[];
  totalCount: number;
}

/** Category pills, search and sort. All state lives in the URL so filtered pages can be shared. */
export function ProductFilters({ categories, totalCount }: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get('category') ?? '';
  const sort = searchParams.get('sort') ?? 'newest';
  const urlQuery = searchParams.get('q') ?? '';

  const [search, setSearch] = useState(urlQuery);
  const debouncedSearch = useDebounce(search.trim(), 350);

  const buildUrl = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const query = params.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  // Push the debounced search term into the URL.
  useEffect(() => {
    if (debouncedSearch === urlQuery) return;
    startTransition(() => router.replace(buildUrl({ q: debouncedSearch || null }), { scroll: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Keep the box in sync when the URL changes elsewhere (back button, clear filters).
  useEffect(() => setSearch(urlQuery), [urlQuery]);

  const pill = (active: boolean) =>
    cn(
      'whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold',
      active
        ? 'border-forest bg-forest text-cream shadow-md'
        : 'border-sage/30 bg-white text-forest hover:bg-sage/10',
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search produce</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search Ringan, Fulawar…"
            className="w-full rounded-full border border-sage/30 bg-white py-3 pl-11 pr-10 text-sm text-forest outline-none transition placeholder:text-forest/40 focus:border-forest focus:ring-2 focus:ring-forest/10"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-forest/50 hover:text-forest"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        <label className="flex items-center gap-2 text-xs font-semibold text-forest/70">
          Sort by
          <select
            value={sort}
            onChange={(event) =>
              startTransition(() =>
                router.replace(buildUrl({ sort: event.target.value === 'newest' ? null : event.target.value }), {
                  scroll: false,
                }),
              )
            }
            className="rounded-full border border-sage/30 bg-white px-4 py-3 text-sm font-medium text-forest outline-none focus:border-forest focus:ring-2 focus:ring-forest/10"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-3">
        <nav aria-label="Product categories" className="scrollbar-none flex flex-1 items-center gap-2.5 overflow-x-auto pb-1">
          <Link href={buildUrl({ category: null })} scroll={false} replace className={pill(!activeCategory)}>
            All produce ({totalCount})
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={buildUrl({ category: category.slug })}
              scroll={false}
              replace
              className={pill(activeCategory === category.slug)}
            >
              {category.name} ({category.productCount})
            </Link>
          ))}
        </nav>
        <span role="status" aria-live="polite" className="flex w-5 shrink-0 justify-center">
          {isPending && <Loader2 className="h-4 w-4 animate-spin text-sage" aria-label="Updating results" />}
        </span>
      </div>
    </div>
  );
}
