<<<<<<< HEAD
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
=======
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItemType {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItemType[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen: boolean) => set({ isOpen }),
      addItem: (item: CartItemType) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((i) => i.id === item.id);
        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += item.quantity;
          set({ items: updated, isOpen: true });
        } else {
          set({ items: [...currentItems, item], isOpen: true });
        }
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'pure-khetar-cart',
    }
  )
);
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
