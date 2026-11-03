import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { broadcastPaymentEvent } from '@/lib/payment-events';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });

  const body = await request.json().catch(() => null) as { orderId?: string } | null;
  const orderId = body?.orderId?.trim();
  if (!orderId) return NextResponse.json({ error: 'orderId is required.' }, { status: 400 });

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: session.user.id },
    include: { paymentIntent: true },
  });
  if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  if (order.paymentMethod !== 'UPI') return NextResponse.json({ error: 'This order is not a UPI payment.' }, { status: 400 });

  let intent = order.paymentIntent;
  if (!intent) {
    const tr = `PK-${randomUUID().replace(/-/g, '').slice(0, 20).toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    intent = await prisma.paymentIntent.create({
      data: { tr, orderId: order.id, amount: order.totalAmount, expiresAt },
    });

    const transactionId = intent.tr;
    setTimeout(async () => {
      const expired = await prisma.paymentIntent.updateMany({
        where: { tr: transactionId, status: 'PENDING', expiresAt: { lte: new Date() } },
        data: { status: 'EXPIRED' },
      });
      if (expired.count) broadcastPaymentEvent(JSON.stringify({ type: 'PAYMENT_EXPIRED', tr: transactionId }));
    }, 5 * 60 * 1000 + 100);
  } else if (intent.status === 'PENDING' && intent.expiresAt <= new Date()) {
    await prisma.paymentIntent.update({ where: { id: intent.id }, data: { status: 'EXPIRED' } });
    intent = await prisma.paymentIntent.findUniqueOrThrow({ where: { id: intent.id } });
  }

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID?.trim();
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET?.trim();
  let razorpayOrderId: string | undefined;

  if (razorpayKeyId && razorpayKeySecret && intent.status === 'PENDING') {
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(intent.amount * 100),
        currency: 'INR',
        receipt: intent.tr,
        notes: { orderId: intent.orderId, transactionId: intent.tr },
      }),
    });
    if (razorpayResponse.ok) {
      const razorpayOrder = await razorpayResponse.json() as { id?: string };
      razorpayOrderId = razorpayOrder.id;
    }
  }

  return NextResponse.json({
    tr: intent.tr,
    orderId: intent.orderId,
    amount: intent.amount,
    status: intent.status,
    createdAt: intent.createdAt.toISOString(),
    expiresAt: intent.expiresAt.toISOString(),
    razorpayKeyId: razorpayKeyId || undefined,
    razorpayOrderId,
  });
}
