import { NextResponse } from 'next/server';
<<<<<<< HEAD
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/** Uptime check: reports whether the app and the database are reachable. */
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', database: 'up' });
  } catch {
    return NextResponse.json({ status: 'degraded', database: 'down' }, { status: 503 });
  }
}
=======

export function GET() {
  return NextResponse.json({ status: 'ok' });
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
