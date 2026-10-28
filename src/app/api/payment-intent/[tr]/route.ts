import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { tr: string } },
) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Please sign in.' }, { status: 401 });

  let intent = await prisma.paymentIntent.findUnique({
    where: { tr: params.tr },
    include: { order: { select: { userId: true } } },
  });
  if (!intent || intent.order.userId !== session.user.id) {
    return NextResponse.json({ error: 'Payment intent not found.' }, { status: 404 });
  }

  if (intent.status === 'PENDING' && intent.expiresAt <= new Date()) {
    intent = await prisma.paymentIntent.update({
      where: { id: intent.id },
      data: { status: 'EXPIRED' },
      include: { order: { select: { userId: true } } },
    });
  }

  return NextResponse.json({
    tr: intent.tr,
    orderId: intent.orderId,
    amount: intent.amount,
    status: intent.status,
    createdAt: intent.createdAt.toISOString(),
    expiresAt: intent.expiresAt.toISOString(),
    completedAt: intent.completedAt?.toISOString() ?? null,
  });
}
