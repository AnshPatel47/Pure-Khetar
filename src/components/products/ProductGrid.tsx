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
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}
