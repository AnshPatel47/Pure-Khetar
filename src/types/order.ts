export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'COD' | 'UPI';

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  landmark?: string;
}

export interface OrderItemSummary {
  productId: string;
  name: string;
  image: string | null;
  unit: string;
  quantity: number;
  price: number;
}

export interface OrderSummary {
  id: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  createdAt: string;
  items: OrderItemSummary[];
}

export type PlaceOrderResult =
  | { ok: true; orderId: string; total: number }
  | { ok: false; message: string };
