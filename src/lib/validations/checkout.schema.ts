import { z } from 'zod';
import { COMMERCE } from '@/lib/constants';
import { indianPhone } from './auth.schema';

export const DELIVERY_SLOTS = ['morning', 'noon', 'evening'] as const;
export const PAYMENT_METHODS = ['COD', 'UPI'] as const;

export const shippingSchema = z.object({
  name: z.string().trim().min(2, 'Enter the receiver’s name').max(60),
  phone: indianPhone,
  address: z.string().trim().min(5, 'Enter your house / flat and building').max(120),
  area: z.string().trim().min(2, 'Enter your area or street').max(120),
  city: z.string().trim().min(2, 'Select your city').max(60),
  pincode: z.string().trim().regex(/^[1-9]\d{5}$/, 'Enter a valid 6-digit pincode'),
  landmark: z.string().trim().max(120).optional(),
});

/** Today's date in India (yyyy-mm-dd) so "today" does not flip at UTC midnight. */
export function todayInIndia(offsetDays = 0): string {
  const now = new Date(Date.now() + offsetDays * 86_400_000);
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(now);
}

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(COMMERCE.maxQuantityPerItem),
      }),
    )
    .min(1, 'Your crate is empty')
    .max(40),
  shipping: shippingSchema,
  deliverySlot: z.enum(DELIVERY_SLOTS),
  deliveryDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Choose a delivery date')
    .refine((date) => date >= todayInIndia(1), 'Delivery starts from tomorrow')
    .refine((date) => date <= todayInIndia(14), 'Delivery can be booked up to 14 days ahead'),
  paymentMethod: z.enum(PAYMENT_METHODS),
  note: z.string().trim().max(200).optional(),
});

export type ShippingInput = z.infer<typeof shippingSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
