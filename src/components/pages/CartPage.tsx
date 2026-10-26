'use client';

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
    </motion.div>
  );
}

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
  );
}
