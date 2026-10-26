'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import { CartItem } from './CartItem';
import { FreeDeliveryProgress } from './FreeDeliveryProgress';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { items, count, totals, isOpen, closeCart, updateQuantity, removeItem } = useCart();
  const closeButton = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(isOpen);
  useEscapeKey(isOpen, closeCart);
  useEffect(() => {
    if (isOpen) closeButton.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            aria-hidden
            className="fixed inset-0 z-[60] bg-forest/50 backdrop-blur-[2px]"
          />

          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Your crate"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 top-0 z-[61] flex w-full max-w-md flex-col border-l border-sage/20 bg-cream shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-sage/20 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-forest" aria-hidden />
                <h2 className="font-serif text-xl font-bold text-forest">Your crate</h2>
                <span className="rounded-full bg-sage/20 px-2 py-0.5 text-xs font-bold text-forest">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                ref={closeButton}
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 text-forest/60 transition-colors hover:bg-forest/5 hover:text-forest"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/10 text-3xl" aria-hidden>
                  🧺
                </span>
                <div>
                  <p className="font-serif text-lg font-bold text-forest">Your crate is empty</p>
                  <p className="mx-auto mt-1 max-w-xs text-sm text-forest/60">
                    Add fresh vegetables from our Kamana farm to get started.
                  </p>
                </div>
                <Button href="/shop" onClick={closeCart}>
                  Explore the harvest
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto p-5 sm:p-6">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                      onRemove={() => removeItem(item.id)}
                      onNavigate={closeCart}
                    />
                  ))}
                </ul>

                <footer className="space-y-4 border-t border-sage/20 bg-white p-5 sm:p-6">
                  <FreeDeliveryProgress totals={totals} />

                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-forest/70">
                      <dt>Subtotal</dt>
                      <dd>{formatPrice(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-forest/70">
                      <dt>Delivery</dt>
                      <dd>{totals.deliveryFee === 0 ? 'Free' : formatPrice(totals.deliveryFee)}</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-sage/15 pt-2">
                      <dt className="font-semibold text-forest">Total</dt>
                      <dd className="font-serif text-xl font-bold text-forest">{formatPrice(totals.total)}</dd>
                    </div>
                  </dl>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-forest py-4 text-sm font-bold text-cream shadow-lg transition-colors hover:bg-forest-l focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2"
                  >
                    Proceed to checkout
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="block text-center text-xs font-semibold text-forest/60 transition-colors hover:text-forest"
                  >
                    View full cart
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
