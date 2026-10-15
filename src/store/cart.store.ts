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