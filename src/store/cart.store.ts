'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { COMMERCE } from '@/lib/constants';
import type { CartItem, CartItemInput } from '@/types/cart';

export const CART_STORAGE_KEY = 'pure-khetar-cart';

interface CartState {
  items: CartItem[];
  note: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setNote: (note: string) => void;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

/** Quantity can never exceed available stock or the per-item limit. */
const clampQuantity = (quantity: number, stock: number) =>
  Math.max(0, Math.min(quantity, stock, COMMERCE.maxQuantityPerItem));

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      note: '',
      isOpen: false,

      setIsOpen: (isOpen) => set({ isOpen }),
      setNote: (note) => set({ note: note.slice(0, 200) }),

      addItem: ({ quantity = 1, ...item }) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          const items = existing
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, ...item, quantity: clampQuantity(i.quantity + quantity, item.stock) }
                  : i,
              )
            : [...state.items, { ...item, quantity: clampQuantity(quantity, item.stock) }];

          return { items: items.filter((i) => i.quantity > 0), isOpen: true };
        }),

      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: clampQuantity(quantity, i.stock) } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [], note: '' }),
    }),
    {
      name: CART_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items, note: state.note }),
      // Hydration is triggered by <StoreProvider /> after mount so the server and
      // first client render always match (no React hydration warnings).
      skipHydration: true,
      migrate: (persisted, version) => {
        const state = persisted as { items?: Partial<CartItem>[] };
        if (version < 1) {
          return {
            items: (state.items ?? []).map((i) => ({
              slug: '',
              stock: COMMERCE.maxQuantityPerItem,
              ...i,
            })),
          };
        }
        return state;
      },
    },
  ),
);
