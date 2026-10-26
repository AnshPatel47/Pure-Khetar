import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { calculateTotals } from '@/lib/pricing';
import type { CheckoutInput } from '@/lib/validations/checkout.schema';
import type { OrderSummary } from '@/types/order';

/** A problem the customer can fix (out of stock, item removed…). Safe to show in the UI. */
export class OrderError extends Error {}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Creates an order atomically:
 *  1. prices come from the database (the browser's prices are ignored),
 *  2. stock is decremented with a guard so two buyers can't oversell the last kg,
 *  3. everything rolls back if any step fails.
 */
export async function createOrder(userId: string, input: CheckoutInput): Promise<{ id: string; total: number }> {
  // Merge duplicate product lines coming from the client.
  const quantities = new Map<string, number>();
  for (const item of input.items) {
    quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);
  }

  try {
    return await prisma.$transaction(
      async (tx) => {
        const products = await tx.product.findMany({
          where: { id: { in: [...quantities.keys()] } },
          select: { id: true, name: true, price: true, stock: true },
        });
        const byId = new Map(products.map((product) => [product.id, product]));

        let subtotal = 0;
        const lines: { productId: string; quantity: number; price: number }[] = [];

        for (const [productId, quantity] of quantities) {
          const product = byId.get(productId);
          if (!product) throw new OrderError('An item in your crate is no longer available.');
          if (product.stock < quantity) {
            throw new OrderError(
              product.stock === 0
                ? `${product.name} is out of stock right now.`
                : `Only ${product.stock} of ${product.name} left. Please reduce the quantity.`,
            );
          }
          subtotal += product.price * quantity;
          lines.push({ productId, quantity, price: product.price });
        }

        for (const line of lines) {
          const updated = await tx.product.updateMany({
            where: { id: line.productId, stock: { gte: line.quantity } },
            data: { stock: { decrement: line.quantity } },
          });
          if (updated.count !== 1) {
            throw new OrderError('Stock changed while you were ordering. Please review your crate.');
          }
        }

        subtotal = round2(subtotal);
        const totals = calculateTotals(subtotal);

        const order = await tx.order.create({
          data: {
            userId,
            subtotal,
            deliveryFee: totals.deliveryFee,
            totalAmount: round2(totals.total),
            paymentMethod: input.paymentMethod,
            deliverySlot: input.deliverySlot,
            deliveryDate: new Date(`${input.deliveryDate}T00:00:00.000Z`),
            shippingAddress: { ...input.shipping, note: input.note ?? null } as Prisma.InputJsonValue,
            items: { create: lines },
          },
          select: { id: true, totalAmount: true },
        });

        return { id: order.id, total: order.totalAmount };
      },
      { timeout: 10_000 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      throw new OrderError('Your session is out of date. Please sign in again and retry.');
    }
    throw error;
  }
}

export async function getOrdersForUser(userId: string, limit = 20): Promise<OrderSummary[]> {
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      status: true,
      paymentMethod: true,
      subtotal: true,
      deliveryFee: true,
      totalAmount: true,
      createdAt: true,
      items: {
        select: {
          productId: true,
          quantity: true,
          price: true,
          product: { select: { name: true, unit: true, images: true } },
        },
      },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    status: order.status,
    paymentMethod: order.paymentMethod,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    totalAmount: order.totalAmount,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      unit: item.product.unit,
      image: item.product.images[0] ?? null,
      quantity: item.quantity,
      price: item.price,
    })),
  }));
}
