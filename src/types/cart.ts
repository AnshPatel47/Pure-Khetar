export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  quantity: number;
  /** Available stock when the item was added — used to cap quantity in the UI. */
  stock: number;
}

export type CartItemInput = Omit<CartItem, 'quantity'> & { quantity?: number };

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
  qualifiesForFreeDelivery: boolean;
  freeDeliveryRemaining: number;
}
