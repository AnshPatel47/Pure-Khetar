import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';
import { AddToCartButton } from './AddToCartButton';
import { FALLBACK_PRODUCT_IMAGE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import type { ProductSummary } from '@/types/product';

interface ProductCardProps {
  product: ProductSummary;
  /** Set on the first row of a page so those photos load immediately instead of lazily. */
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const soldOut = product.stock <= 0;
  const lowStock = !soldOut && product.stock <= 10;

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-cream" tabIndex={-1} aria-hidden>
        <SmartImage
          src={product.images[0] ?? FALLBACK_PRODUCT_IMAGE}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${soldOut ? 'grayscale' : ''}`}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isOrganic && <Badge variant="natural">Natural</Badge>}
          {lowStock && <Badge variant="accent">Only {product.stock} left</Badge>}
          {soldOut && <Badge variant="danger">Sold out</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-sage">{product.category.name}</p>
        <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-forest transition-colors group-hover:text-terracotta">
          <Link href={href}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-forest/60">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-sage/15 pt-4">
          <p className="font-serif text-xl font-bold leading-none text-forest">
            {formatPrice(product.price)}
            <span className="ml-1 text-xs font-normal text-forest/50">/ {product.unit}</span>
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
