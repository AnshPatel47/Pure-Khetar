<<<<<<< HEAD
import { Sprout } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';
import type { ProductSummary } from '@/types/product';

interface ProductGridProps {
  products: ProductSummary[];
  /** How many cards (from the top) should load their photos eagerly. */
  priorityCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ProductGrid({
  products,
  priorityCount = 0,
  emptyTitle = 'No products found',
  emptyDescription = 'Try a different search or category — new harvests are added all the time.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-sage/20 bg-white px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 text-forest">
          <Sprout className="h-7 w-7" />
        </div>
        <p className="font-serif text-xl font-bold text-forest">{emptyTitle}</p>
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-forest/60">{emptyDescription}</p>
        <Button href="/shop" variant="outline" size="sm" className="mt-6">
          See all produce
        </Button>
=======
import React from 'react';
import type { Product } from '@prisma/client';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#7A9A6B]/20 p-8">
        <p className="font-serif text-xl font-bold text-[#1F4D2E]">No products found</p>
        <p className="text-xs text-gray-500 mt-1">Check back soon for upcoming Kamana farm harvests!</p>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
=======
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
