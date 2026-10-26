<<<<<<< HEAD
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
          {product.isOrganic && <Badge variant="organic">Organic</Badge>}
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
=======
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@prisma/client';
import { useCartStore } from '@/store/cart.store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.images[0] || '/images/products/ringan.jpeg',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-3xl p-4 border border-[#7A9A6B]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <Link href={`/products/${product.slug}`} className="block relative w-full h-56 rounded-2xl overflow-hidden bg-[#FAF6EC] mb-4">
          <Image
            src={product.images[0] || '/images/products/ringan.jpeg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isOrganic && (
            <span className="absolute top-3 left-3 bg-[#E0A528] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              100% Organic
            </span>
          )}
        </Link>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-bold text-[#1F4D2E] group-hover:text-[#C86D3B] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-400">Price / {product.unit}</span>
          <p className="font-serif text-lg font-bold text-[#1F4D2E]">₹{product.price}</p>
        </div>
        
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-md ${
            added
              ? 'bg-[#C86D3B] text-white'
              : 'bg-[#1F4D2E] text-white hover:bg-[#1F4D2E]/90'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Crate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
