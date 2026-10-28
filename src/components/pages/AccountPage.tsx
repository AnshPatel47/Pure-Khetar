import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { FALLBACK_PRODUCT_IMAGE } from '@/lib/constants';
import { formatDate, formatPrice } from '@/lib/utils';
import type { OrderStatus, OrderSummary } from '@/types/order';
import { PageHeader } from './PageHeader';

const STATUS: Record<OrderStatus, { label: string; variant: 'soft' | 'natural' | 'forest' | 'danger' }> = {
  PENDING: { label: 'Order received', variant: 'natural' },
  PROCESSING: { label: 'Being packed', variant: 'natural' },
  SHIPPED: { label: 'Out for delivery', variant: 'forest' },
  DELIVERED: { label: 'Delivered', variant: 'soft' },
  CANCELLED: { label: 'Cancelled', variant: 'danger' },
};

interface AccountPageProps {
  user: { name: string; email: string; phone: string | null; createdAt: Date };
  orders: OrderSummary[];
}

export function AccountPage({ user, orders }: AccountPageProps) {
  return (
    <>
      <PageHeader title={`Namaste, ${user.name.split(' ')[0]}`} description="Your details and recent orders." />

      <Container className="grid gap-8 py-12 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit space-y-4 rounded-3xl border border-sage/20 bg-white p-6 shadow-card">
          <h2 className="font-serif text-xl font-bold text-forest">Your details</h2>
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs font-semibold text-forest/50">Name</dt>
              <dd className="font-medium text-forest">{user.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-forest/50">Email</dt>
              <dd className="break-all font-medium text-forest">{user.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-forest/50">Mobile</dt>
              <dd className="font-medium text-forest">{user.phone ?? 'Not added'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-forest/50">Member since</dt>
              <dd className="font-medium text-forest">{formatDate(user.createdAt)}</dd>
            </div>
          </dl>
        </aside>

        <section aria-labelledby="orders-heading" className="space-y-5">
          <h2 id="orders-heading" className="font-serif text-2xl font-bold text-forest">
            Your orders
          </h2>

          {orders.length === 0 ? (
            <div className="rounded-3xl border border-sage/20 bg-white px-6 py-14 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                <PackageOpen className="h-6 w-6" aria-hidden />
              </div>
              <p className="font-serif text-xl font-bold text-forest">No orders yet</p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-forest/60">
                When you place an order, you can follow it here.
              </p>
              <Button href="/shop" className="mt-6">
                Start shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {orders.map((order) => {
                const status = STATUS[order.status];
                return (
                  <li key={order.id} className="overflow-hidden rounded-3xl border border-sage/20 bg-white shadow-card">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sage/15 bg-cream/60 px-5 py-4">
                      <div>
                        <p className="text-xs font-semibold text-forest/50">Order #{order.id.slice(-8).toUpperCase()}</p>
                        <p className="text-sm font-medium text-forest">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={status.variant}>{status.label}</Badge>
                        <p className="font-serif text-lg font-bold text-forest">{formatPrice(order.totalAmount)}</p>
                      </div>
                    </div>
                    <ul className="divide-y divide-sage/10 px-5">
                      {order.items.map((item) => (
                        <li key={item.productId} className="flex items-center gap-4 py-3.5">
                          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-cream">
                            <SmartImage src={item.image ?? FALLBACK_PRODUCT_IMAGE} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-forest">{item.name}</p>
                            <p className="text-xs text-forest/55">
                              {item.quantity} {item.unit} × {formatPrice(item.price)}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-forest">{formatPrice(item.price * item.quantity)}</p>
                        </li>
                      ))}
                    </ul>
                    <p className="border-t border-sage/15 px-5 py-3 text-xs text-forest/55">
                      Payment: {order.paymentMethod === 'COD' ? 'Cash on delivery' : 'UPI on delivery'} ·{' '}
                      <Link href="/contact" className="font-semibold text-forest hover:text-terracotta">
                        Need help with this order?
                      </Link>
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </Container>
    </>
  );
}
