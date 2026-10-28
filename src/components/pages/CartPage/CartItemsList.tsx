'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { FreeDeliveryProgress } from '@/components/cart/FreeDeliveryProgress';
import { COMMERCE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import type { CartTotals } from '@/types/cart';

type CartItem = {
  id: string;
  name: string;
  slug?: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
  stock: number;
};

interface CartItemsListProps {
  items: CartItem[];
  totals: CartTotals;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartItemsList({ items, totals, onUpdateQuantity, onRemoveItem }: CartItemsListProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-sage/10 bg-white shadow-card">
      <div className="px-6 pt-5">
        <FreeDeliveryProgress totals={totals} />
      </div>
      <ul className="divide-y divide-sage/10 px-6">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-4 overflow-hidden py-5"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border border-sage/10 bg-cream sm:h-24 sm:w-24">
                <SmartImage src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-1 font-serif text-base font-bold text-forest">
                  {item.slug ? (
                    <Link href={`/products/${item.slug}`} className="hover:text-terracotta">
                      {item.name}
                    </Link>
                  ) : item.name}
                </h3>
                <p className="mt-0.5 text-xs text-forest/50">{formatPrice(item.price)} / {item.unit}</p>

                <div
                  className="mt-3 inline-flex items-center overflow-hidden rounded-full border border-sage/20 bg-cream"
                  role="group"
                  aria-label={`Quantity of ${item.name}`}
                >
                  <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 text-forest transition-colors hover:bg-sage/15" aria-label={`Decrease quantity of ${item.name}`}>
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-forest" aria-live="polite">{item.quantity}</span>
                  <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= Math.min(item.stock, COMMERCE.maxQuantityPerItem)} className="p-2 text-forest transition-colors hover:bg-sage/15 disabled:opacity-30" aria-label={`Increase quantity of ${item.name}`}>
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="font-serif text-lg font-bold text-forest">{formatPrice(item.price * item.quantity)}</p>
                <button type="button" onClick={() => onRemoveItem(item.id)} className="mt-2 rounded-lg p-1.5 text-forest/30 transition-colors hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
