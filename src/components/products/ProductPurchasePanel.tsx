'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { COMMERCE, SITE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import type { ProductSummary } from '@/types/product';

export function ProductPurchasePanel({ product }: { product: ProductSummary }) {
  const max = Math.max(1, Math.min(product.stock, COMMERCE.maxQuantityPerItem));
  const [quantity, setQuantity] = useState(1);
  const soldOut = product.stock <= 0;

  const step = (delta: number) => setQuantity((q) => Math.min(max, Math.max(1, q + delta)));

  return (
    <div className="space-y-5">
      {!soldOut && (
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex items-center rounded-full border border-sage/30 bg-white" role="group" aria-label="Quantity">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition hover:bg-forest/5 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-10 text-center text-sm font-bold text-forest" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={quantity >= max}
              aria-label="Increase quantity"
              className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition hover:bg-forest/5 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <p className="text-sm text-forest/60">
            Total{' '}
            <span className="font-serif text-xl font-bold text-forest">{formatPrice(product.price * quantity)}</span>
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton product={product} quantity={quantity} size="lg" fullWidth className="sm:flex-1" />
        <WhatsAppButton
          size="lg"
          label="Order on WhatsApp"
          message={`Hello ${SITE.name}! I would like to order ${quantity} ${product.unit} of ${product.name}.`}
        />
      </div>
    </div>
  );
}
