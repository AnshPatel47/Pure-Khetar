'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { useCartStore } from '@/store/cart.store';
import { calculateTotals } from '@/lib/pricing';
import type { CartItem } from '@/types/cart';

const EMPTY_ITEMS: CartItem[] = [];

/** True once the persisted cart has been read from localStorage (client only). */
export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useCartStore.persist.onFinishHydration(onChange),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
}

/**
 * The one hook components use for the cart.
 * Until hydration finishes it reports an empty cart, so server HTML and the first
 * client render are identical.
 */
export function useCart() {
  const hydrated = useCartHydrated();
  const storedItems = useCartStore((s) => s.items);
  const storedNote = useCartStore((s) => s.note);
  const setNote = useCartStore((s) => s.setNote);
  const isOpen = useCartStore((s) => s.isOpen);
  const setIsOpen = useCartStore((s) => s.setIsOpen);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  const items = hydrated ? storedItems : EMPTY_ITEMS;
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const totals = useMemo(() => calculateTotals(subtotal), [subtotal]);

  return {
    items,
    count,
    totals,
    note: hydrated ? storedNote : '',
    setNote,
    hydrated,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
