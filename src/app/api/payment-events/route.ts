import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { subscribeToPaymentEvents } from '@/lib/payment-events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response('Unauthorized', { status: 401 });

  const tr = new URL(request.url).searchParams.get('tr');
  if (!tr) return new Response('Transaction ID required', { status: 400 });
  const intent = await prisma.paymentIntent.findUnique({ where: { tr }, include: { order: true } });
  if (!intent || intent.order.userId !== session.user.id) return new Response('Not found', { status: 404 });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const unsubscribe = subscribeToPaymentEvents((message) => {
        try {
          const event = JSON.parse(message) as { tr?: string };
          if (event.tr !== tr) return;
          controller.enqueue(encoder.encode(`data: ${message}\n\n`));
        } catch {
          // Ignore malformed internal events.
        }
      });
      controller.enqueue(encoder.encode(': connected\n\n'));
      const keepAlive = setInterval(() => controller.enqueue(encoder.encode(': keepalive\n\n')), 15_000);
      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        unsubscribe();
        try { controller.close(); } catch { /* already closed */ }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
