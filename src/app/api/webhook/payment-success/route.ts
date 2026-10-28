import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { broadcastPaymentEvent } from '@/lib/payment-events';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const secret = process.env.UPI_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
  const supplied = request.headers.get('x-webhook-secret') ?? '';
  const expected = Buffer.from(secret);
  const actual = Buffer.from(supplied);
  const valid = expected.length === actual.length && timingSafeEqual(expected, actual);
  if (!valid) return NextResponse.json({ error: 'Invalid webhook secret.' }, { status: 401 });

  const body = await request.json().catch(() => null) as { tr?: string; status?: string; amount?: number } | null;
  if (!body) return NextResponse.json({ error: 'Invalid payment payload.' }, { status: 400 });
  const tr = body.tr?.trim();
  if (!tr || body.status !== 'SUCCESS') {
    return NextResponse.json({ error: 'Invalid payment payload.' }, { status: 400 });
  }

  const intent = await prisma.paymentIntent.findUnique({ where: { tr } });
  if (!intent) return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
  if (intent.status === 'EXPIRED') return NextResponse.json({ error: 'Payment session has expired.' }, { status: 410 });
  if (intent.status === 'COMPLETED') return NextResponse.json({ ok: true, tr, alreadyProcessed: true });
  if (intent.expiresAt <= new Date()) {
    await prisma.paymentIntent.update({ where: { id: intent.id }, data: { status: 'EXPIRED' } });
    return NextResponse.json({ error: 'Payment session has expired.' }, { status: 410 });
  }
  if (typeof body.amount === 'number' && Math.abs(body.amount - intent.amount) > 0.001) {
    return NextResponse.json({ error: 'Payment amount mismatch.' }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.paymentIntent.update({
      where: { id: intent.id },
      data: { status: 'COMPLETED', completedAt: new Date() },
    }),
    prisma.order.update({ where: { id: intent.orderId }, data: { status: 'PROCESSING' } }),
  ]);
  broadcastPaymentEvent(JSON.stringify({ type: 'PAYMENT_SUCCESSFUL', tr }));
  return NextResponse.json({ ok: true, tr, status: 'COMPLETED' });
}
