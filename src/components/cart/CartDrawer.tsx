'use client';

<<<<<<< HEAD
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
=======
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb

  return (
    <AnimatePresence>
      {isOpen && (
        <>
<<<<<<< HEAD
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
=======
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF6EC] shadow-2xl z-50 flex flex-col border-l border-[#7A9A6B]/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#7A9A6B]/20 bg-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1F4D2E]" />
                <h2 className="font-serif text-xl font-bold text-[#1F4D2E]">Your Organic Crate</h2>
                <span className="text-xs bg-[#7A9A6B]/20 text-[#1F4D2E] px-2 py-0.5 rounded-full font-bold">
                  {totalItems()} items
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-[#1F4D2E] rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <div className="w-16 h-16 bg-[#7A9A6B]/10 rounded-full flex items-center justify-center mx-auto text-[#1F4D2E] text-2xl">
                    🧺
                  </div>
                  <p className="font-serif text-lg font-bold text-[#1F4D2E]">Your crate is empty</p>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Add fresh vegetables, organic Ringan, or weekly baskets from Kamana farm to get started!
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-block bg-[#1F4D2E] text-white text-xs font-semibold px-6 py-3 rounded-full shadow hover:bg-[#1F4D2E]/90 transition-colors"
                  >
                    Explore Harvest
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-2xl border border-[#7A9A6B]/20 shadow-sm items-center"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm font-bold text-[#1F4D2E] truncate">{item.name}</h3>
                      <p className="text-xs text-gray-500">₹{item.price} / {item.unit}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#1F4D2E]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-serif text-sm font-bold text-[#1F4D2E]">₹{item.price * item.quantity}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors mt-2 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#7A9A6B]/20 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-serif text-lg font-bold text-[#1F4D2E]">₹{subtotal()}</span>
                </div>
                <p className="text-[11px] text-gray-500 text-center">
                  🌱 Shipping & taxes calculated at checkout. Kamana harvest guaranteed fresh.
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#1F4D2E] text-white py-4 rounded-full font-semibold hover:bg-[#1F4D2E]/90 transition-colors shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
        </>
      )}
    </AnimatePresence>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
