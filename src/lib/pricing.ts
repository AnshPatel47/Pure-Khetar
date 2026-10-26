import { COMMERCE } from './constants';
import type { CartTotals } from '@/types/cart';

/** Delivery fee and totals — used by cart, drawer, checkout AND the server (never trust the client). */
export function calculateTotals(subtotal: number): CartTotals {
  const qualifiesForFreeDelivery = subtotal >= COMMERCE.freeDeliveryThreshold;
  const deliveryFee = subtotal === 0 || qualifiesForFreeDelivery ? 0 : COMMERCE.deliveryFee;

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    qualifiesForFreeDelivery,
    freeDeliveryRemaining: Math.max(0, COMMERCE.freeDeliveryThreshold - subtotal),
  };
}
