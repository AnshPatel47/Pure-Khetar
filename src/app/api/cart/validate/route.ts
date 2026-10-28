import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as { ids?: string[] } | null;
  const ids = Array.isArray(body?.ids) ? [...new Set(body.ids.filter((id) => typeof id === 'string' && id.length > 0))] : [];
  if (!ids.length) return NextResponse.json({ products: [] });

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, stock: true, price: true, images: true },
  });
  return NextResponse.json({ products });
}
