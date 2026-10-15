import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json(
    { error: 'Cart API is not implemented; cart data is currently stored on the client.' },
    { status: 501 },
  );
}

export function POST() {
  return NextResponse.json(
    { error: 'Cart API is not implemented; cart data is currently stored on the client.' },
    { status: 501 },
  );
}