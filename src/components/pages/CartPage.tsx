'use client';

<<<<<<< HEAD
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Leaf, MessageSquare, Minus, Plus, Shield, Sprout, Trash2, Truck } from 'lucide-react';
import { FreeDeliveryProgress } from '@/components/cart/FreeDeliveryProgress';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Skeleton } from '@/components/ui/Skeleton';
import { SmartImage } from '@/components/ui/SmartImage';
import { COMMERCE } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

const REASSURANCES = [
  { icon: Truck, text: 'Harvested fresh and delivered in your chosen window' },
  { icon: Shield, text: 'Pay only when your order arrives' },
  { icon: Sprout, text: 'Questions? WhatsApp the farm team any time' },
];

function EmptyCart() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 py-24 text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-forest/5 text-5xl" aria-hidden>🧺</div>
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Your crate is empty</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-forest/55">
          Add fresh vegetables straight from our Kamana farm.
        </p>
      </div>
      <Button href="/shop" size="lg" leftIcon={<Sprout className="h-4 w-4" aria-hidden />}>
        Explore fresh harvest
      </Button>
=======
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Minus, Trash2, ArrowRight,
  Sprout, Truck, Shield, Leaf, MessageSquare
} from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

/* ─── Reveal ────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
    </motion.div>
  );
}

<<<<<<< HEAD
export default function CartPage() {
  const { items, count, totals, hydrated, note, setNote, updateQuantity, removeItem } = useCart();
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="bg-cream">
      <div className="border-b border-sage/10 bg-white">
        <Container className="py-8">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-terracotta">
                  <Leaf className="h-3.5 w-3.5" aria-hidden />
                  Your organic crate
                </p>
                <h1 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
                  Cart
                  {count > 0 && <span className="ml-3 text-lg font-normal text-sage">({count} items)</span>}
                </h1>
              </div>
              <Link href="/shop" className="hidden text-sm font-semibold text-forest/60 transition-colors hover:text-forest sm:block">
                ← Continue shopping
              </Link>
            </div>
          </Reveal>
        </Container>
      </div>

      <Container className="py-10">
        {!hydrated ? (
          <div className="grid gap-8 lg:grid-cols-3" aria-busy>
            <Skeleton className="h-72 lg:col-span-2" />
            <Skeleton className="h-72" />
          </div>
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
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
                            ) : (
                              item.name
                            )}
                          </h3>
                          <p className="mt-0.5 text-xs text-forest/50">
                            {formatPrice(item.price)} / {item.unit}
                          </p>

                          <div className="mt-3 inline-flex items-center overflow-hidden rounded-full border border-sage/20 bg-cream" role="group" aria-label={`Quantity of ${item.name}`}>
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-forest transition-colors hover:bg-sage/15" aria-label={`Decrease quantity of ${item.name}`}>
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-forest" aria-live="polite">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= Math.min(item.stock, COMMERCE.maxQuantityPerItem)}
                              className="p-2 text-forest transition-colors hover:bg-sage/15 disabled:opacity-30"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <p className="font-serif text-lg font-bold text-forest">{formatPrice(item.price * item.quantity)}</p>
                          <button type="button" onClick={() => removeItem(item.id)} className="mt-2 rounded-lg p-1.5 text-forest/30 transition-colors hover:bg-red-50 hover:text-red-500" aria-label={`Remove ${item.name}`}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>

              <div className="rounded-3xl border border-sage/10 bg-white p-6 shadow-card">
                <button
                  type="button"
                  onClick={() => setShowNote((open) => !open)}
                  aria-expanded={showNote}
                  className="flex w-full items-center gap-2 text-left text-sm font-semibold text-forest transition-colors hover:text-terracotta"
                >
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  {showNote ? 'Hide' : 'Add'} order note
                  <span className="text-xs font-normal text-forest/45">(special instructions)</span>
                </button>

                <AnimatePresence initial={false}>
                  {showNote && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <label htmlFor="order-note" className="sr-only">Order note</label>
                      <textarea
                        id="order-note"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        maxLength={200}
                        rows={3}
                        placeholder="E.g. Please pack vegetables separately."
                        className="mt-4 w-full resize-none rounded-2xl border border-sage/20 bg-cream p-4 text-sm text-forest outline-none transition-colors placeholder:text-forest/35 focus:border-forest/40"
                      />
                      <p className="mt-1.5 text-xs text-forest/45">{note.length}/200 characters</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-3xl border border-sage/10 bg-white shadow-card">
                <div className="p-6">
                  <h2 className="mb-5 font-serif text-xl font-bold text-forest">Order summary</h2>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between text-forest/65">
                      <dt>Subtotal ({count} items)</dt>
                      <dd className="font-semibold text-forest">{formatPrice(totals.subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-forest/65">
                      <dt>Delivery</dt>
                      <dd className={totals.deliveryFee === 0 ? 'font-semibold text-sage' : 'font-semibold text-forest'}>
                        {totals.deliveryFee === 0 ? 'Free' : formatPrice(totals.deliveryFee)}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-sage/10 pt-3 text-base font-bold text-forest">
                      <dt>Total</dt>
                      <dd className="font-serif text-xl">{formatPrice(totals.total)}</dd>
                    </div>
                  </dl>
                </div>
                <div className="px-6 pb-6">
                  <Button href="/checkout" size="lg" fullWidth rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
                    Proceed to checkout
                  </Button>
                  <p className="mt-3 text-center text-xs text-forest/45">You pay only when your order arrives.</p>
                </div>
              </div>

              <ul className="space-y-3 rounded-2xl border border-sage/10 bg-cream p-4">
                {REASSURANCES.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-xs font-medium text-forest/70">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-sage/10 bg-white shadow-sm">
                      <Icon className="h-4 w-4 text-forest" aria-hidden />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        )}
      </Container>
    </div>
=======
/* ─── Empty State ───────────────────────────────────────────────────── */
function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-24 space-y-6"
    >
      <div className="w-24 h-24 bg-forest/5 rounded-3xl flex items-center justify-center mx-auto text-5xl">
        🧺
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Your crate is empty</h2>
        <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
          Add fresh vegetables, organic ringan, or weekly baskets from Kamana farm.
        </p>
      </div>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-4 rounded-full font-bold text-sm hover:bg-forest-l transition-colors shadow-organic"
      >
        <Sprout className="w-4 h-4" />
        Explore Fresh Harvest
        <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCartStore();
  const [orderNote, setOrderNote] = useState('');
  const [showNote, setShowNote] = useState(false);

  const deliveryFee = subtotal() >= 499 ? 0 : 49;
  const total = subtotal() + deliveryFee;
  const savings = subtotal() >= 499 ? 49 : 0;

  return (
    <main className="bg-cream min-h-screen">
      {/* ── Page Header ── */}
      <div className="bg-white border-b border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-terracotta uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" />
                  Your Organic Crate
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                  Cart
                  {totalItems() > 0 && (
                    <span className="ml-3 text-lg font-normal text-sage">({totalItems()} items)</span>
                  )}
                </h1>
              </div>
              <Link
                href="/shop"
                className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-forest/60 hover:text-forest transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* ── Left: Cart Items ── */}
            <div className="lg:col-span-2 space-y-4">
              <Reveal>
                <div className="bg-white rounded-3xl border border-sage/10 shadow-card overflow-hidden">
                  {/* Eco delivery banner */}
                  <div className="bg-forest px-6 py-3 flex items-center gap-3">
                    <Truck className="w-4 h-4 text-marigold flex-shrink-0" />
                    <p className="text-xs font-semibold text-cream">
                      {deliveryFee === 0
                        ? '🎉 Free morning harvest delivery applied!'
                        : `Add ₹${499 - subtotal()} more for free delivery`}
                    </p>
                    {deliveryFee === 0 && <span className="ml-auto text-xs bg-marigold text-forest px-2 py-0.5 rounded-full font-bold">FREE</span>}
                  </div>

                  {/* Free delivery progress */}
                  {deliveryFee > 0 && (
                    <div className="px-6 pt-4">
                      <div className="relative h-1.5 bg-sage/15 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((subtotal() / 499) * 100, 100)}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage to-forest rounded-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="divide-y divide-sage/8 px-6">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="py-5 flex gap-4 items-center"
                        >
                          {/* Image */}
                          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-cream flex-shrink-0 border border-sage/10">
                            <Image
                              src={item.image || '/images/products/ringan.jpeg'}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-serif text-base font-bold text-forest line-clamp-1">{item.name}</h3>
                            <p className="text-xs text-gray-400 mt-0.5">₹{item.price} / {item.unit}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center bg-cream border border-sage/20 rounded-full overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-sage/15 text-forest transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm font-bold text-forest">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-sage/15 text-forest transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <span className="text-xs text-sage font-medium">
                                {item.quantity} {item.unit}
                              </span>
                            </div>
                          </div>

                          {/* Price & Remove */}
                          <div className="text-right flex-shrink-0">
                            <p className="font-serif text-lg font-bold text-forest">
                              ₹{(item.price * item.quantity).toFixed(0)}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="mt-2 p-1.5 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>

              {/* Order Notes */}
              <Reveal delay={0.1}>
                <div className="bg-white rounded-3xl border border-sage/10 shadow-card p-6">
                  <button
                    onClick={() => setShowNote(!showNote)}
                    className="flex items-center gap-2 text-sm font-semibold text-forest hover:text-terracotta transition-colors w-full text-left"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {showNote ? 'Hide' : 'Add'} Order Note
                    <span className="text-xs text-gray-400 font-normal">(special instructions, allergy info, etc.)</span>
                  </button>

                  <AnimatePresence>
                    {showNote && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <textarea
                          value={orderNote}
                          onChange={(e) => setOrderNote(e.target.value)}
                          placeholder="E.g. Please pack vegetables separately. No plastic bags please."
                          rows={3}
                          className="mt-4 w-full text-sm text-forest bg-cream border border-sage/20 rounded-2xl p-4 outline-none focus:border-forest/40 resize-none placeholder-gray-400 transition-colors"
                        />
                        <p className="text-xs text-gray-400 mt-1.5">{orderNote.length}/200 characters</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            </div>

            {/* ── Right: Order Summary ── */}
            <Reveal delay={0.15}>
              <div className="sticky top-24 space-y-4">
                {/* Summary Card */}
                <div className="bg-white rounded-3xl border border-sage/10 shadow-card overflow-hidden">
                  <div className="p-6">
                    <h2 className="font-serif text-xl font-bold text-forest mb-5">Order Summary</h2>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({totalItems()} items)</span>
                        <span className="font-semibold text-forest">₹{subtotal().toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Morning Harvest Delivery</span>
                        <span className={`font-semibold ${deliveryFee === 0 ? 'text-sage' : 'text-forest'}`}>
                          {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                        </span>
                      </div>
                      {savings > 0 && (
                        <div className="flex justify-between text-sage text-xs">
                          <span>You saved</span>
                          <span>₹{savings}</span>
                        </div>
                      )}
                      <div className="h-px bg-sage/10 my-2" />
                      <div className="flex justify-between font-bold text-forest text-base">
                        <span>Total</span>
                        <span className="font-serif text-xl">₹{total.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <Link
                      href="/checkout"
                      className="w-full flex items-center justify-center gap-2 bg-forest text-cream py-4 rounded-2xl font-bold text-sm hover:bg-forest-l transition-colors shadow-organic hover:shadow-organic-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <p className="text-center text-xs text-gray-400 mt-3">
                      🔒 Secure checkout — your data is safe
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="bg-cream rounded-2xl border border-sage/10 p-4 space-y-3">
                  {[
                    { icon: <Truck className="w-4 h-4 text-forest" />, text: 'Morning harvest delivery by 9 AM' },
                    { icon: <Shield className="w-4 h-4 text-forest" />, text: '100% freshness guarantee' },
                    { icon: <Sprout className="w-4 h-4 text-forest" />, text: 'Zero chemicals — lab verified' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-xs text-gray-600 font-medium">
                      <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm border border-sage/10">
                        {icon}
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </main>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  );
}
