'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';
import { AddToCartButton } from './AddToCartButton';
import { FALLBACK_PRODUCT_IMAGE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { formatWeight, isWeightUnit, normalizeWeightQuantity, MIN_WEIGHT_GRAMS, WEIGHT_STEP_GRAMS } from '@/lib/weight';
import type { ProductSummary } from '@/types/product';

interface ProductCardProps {
  product: ProductSummary;
  /** Set on the first row of a page so those photos load immediately instead of lazily. */
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const comingSoon = Boolean(product.comingSoon);
  const soldOut = product.stock <= 0 || comingSoon;
  const lowStock = !soldOut && product.stock <= 10;
  const images = product.images.length ? product.images : [FALLBACK_PRODUCT_IMAGE];
  const [activeImage, setActiveImage] = useState(0);
  const [paused, setPaused] = useState(false);
  const weightProduct = isWeightUnit(product.unit);
  const maxGrams = weightProduct ? Math.round(product.stock * 1000) : 0;
  const [quantity, setQuantity] = useState(weightProduct ? Math.min(MIN_WEIGHT_GRAMS, maxGrams) : 1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || paused || reduceMotion) return;
    const timer = window.setInterval(() => setActiveImage((current) => (current + 1) % images.length), 3200);
    return () => window.clearInterval(timer);
  }, [images.length, paused, reduceMotion]);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-sage/15 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div
        className="relative block aspect-[16/9] overflow-hidden bg-cream"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <Link href={href} aria-label={`View ${product.name}`} className="absolute inset-0">
          <SmartImage
            src={images[activeImage]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 38vw, 92vw"
            className={`object-cover transition-opacity duration-500 group-hover:scale-[1.03] ${soldOut ? 'grayscale' : ''}`}
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.isChemicalFree && <Badge variant="natural">Natural</Badge>}
          {lowStock && <Badge variant="accent">Only {product.stock} left</Badge>}
          {comingSoon && <Badge variant="accent">Coming soon</Badge>}
          {!comingSoon && soldOut && <Badge variant="danger">Sold out</Badge>}
        </div>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/85 px-2 py-1 backdrop-blur-sm">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                aria-label={`Show image ${index + 1} of ${images.length}`}
                onClick={() => setActiveImage(index)}
                className={`h-1.5 rounded-full transition-all ${index === activeImage ? 'w-4 bg-forest' : 'w-1.5 bg-forest/35'}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-sage">{product.category.name}</p>
        <h3 className="mt-1 font-serif text-lg font-bold leading-snug text-forest transition-colors group-hover:text-terracotta">
          <Link href={href}>
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-forest/60">{product.description}</p>

        <div className="mt-4 space-y-3 border-t border-sage/15 pt-4">
          <p className="font-serif text-xl font-bold leading-none text-forest">
            {comingSoon ? 'Coming soon' : (
              <>{formatPrice(product.price)}<span className="ml-1 text-xs font-normal text-forest/50">/ {product.unit}</span></>
            )}
          </p>
          {!comingSoon && weightProduct ? (
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center rounded-full border border-sage/25 bg-cream" role="group" aria-label={`Quantity of ${product.name}`}>
                <button type="button" onClick={() => setQuantity((q) => normalizeWeightQuantity(q - WEIGHT_STEP_GRAMS, maxGrams))} disabled={quantity <= MIN_WEIGHT_GRAMS} aria-label="Decrease quantity" className="flex h-10 w-10 items-center justify-center rounded-full text-forest disabled:opacity-30"><Minus className="h-3.5 w-3.5" /></button>
                <span className="min-w-[4rem] text-center text-xs font-bold text-forest" aria-live="polite">{formatWeight(quantity)}</span>
                <button type="button" onClick={() => setQuantity((q) => normalizeWeightQuantity(q + WEIGHT_STEP_GRAMS, maxGrams))} disabled={quantity >= maxGrams} aria-label="Increase quantity" className="flex h-10 w-10 items-center justify-center rounded-full text-forest disabled:opacity-30"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <AddToCartButton product={product} quantity={quantity} />
            </div>
          ) : !comingSoon ? (
            <div className="flex justify-end"><AddToCartButton product={product} /></div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
