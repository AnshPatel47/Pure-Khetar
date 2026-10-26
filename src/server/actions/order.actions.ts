'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { auth } from '@/lib/auth';
import { checkoutSchema } from '@/lib/validations/checkout.schema';
import { OrderError, createOrder } from '@/services/order.service';
import { PRODUCT_CACHE_TAG } from '@/services/product.service';
import type { PlaceOrderResult } from '@/types/order';

export async function placeOrderAction(payload: unknown): Promise<PlaceOrderResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: 'Please sign in to place your order.' };
  }

  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? 'Please check your order details.' };
  }

  try {
    const order = await createOrder(session.user.id, parsed.data);
    revalidateTag(PRODUCT_CACHE_TAG); // stock changed
    revalidatePath('/account');
    return { ok: true, orderId: order.id, total: order.total };
  } catch (error) {
    if (error instanceof OrderError) return { ok: false, message: error.message };
    console.error('[placeOrder] failed:', error);
    return {
      ok: false,
      message: 'We could not place your order right now. Please try again, or order on WhatsApp.',
    };
  }
}
