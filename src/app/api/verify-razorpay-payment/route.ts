import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { broadcastPaymentEvent } from '@/lib/payment-events';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });

  const secret = process.env.RAZORPAY_KEY_SECRET?.trim();
  if (!secret) return NextResponse.json({ error: 'Razorpay is not configured.' }, { status: 503 });

  const body = await request.json().catch(() => null) as {
    tr?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  } | null;
  const tr = body?.tr?.trim();
  const orderId = body?.razorpay_order_id?.trim();
  const paymentId = body?.razorpay_payment_id?.trim();
  const signature = body?.razorpay_signature?.trim();
  if (!tr || !orderId || !paymentId || !signature) {
    return NextResponse.json({ error: 'Invalid Razorpay response.' }, { status: 400 });
  }

  const expectedSignature = createHmac('sha256', secret).update(`${orderId}|${paymentId}`).digest('hex');
  const expected = Buffer.from(expectedSignature);
  const supplied = Buffer.from(signature);
  if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) {
    return NextResponse.json({ error: 'Payment signature verification failed.' }, { status: 400 });
  }

  const intent = await prisma.paymentIntent.findFirst({
    where: { tr, order: { userId: session.user.id } },
  });
  if (!intent) return NextResponse.json({ error: 'Payment intent not found.' }, { status: 404 });
  if (intent.status === 'COMPLETED') return NextResponse.json({ ok: true, tr, alreadyProcessed: true });
  if (intent.status === 'EXPIRED' || intent.expiresAt <= new Date()) {
    return NextResponse.json({ error: 'Payment session has expired.' }, { status: 410 });
  }

  await prisma.$transaction([
    prisma.paymentIntent.update({ where: { id: intent.id }, data: { status: 'COMPLETED', completedAt: new Date() } }),
    prisma.order.update({ where: { id: intent.orderId }, data: { status: 'PROCESSING' } }),
  ]);
  broadcastPaymentEvent(JSON.stringify({ type: 'PAYMENT_SUCCESSFUL', tr }));
  return NextResponse.json({ ok: true, tr, status: 'COMPLETED' });
}
