'use client';

import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';
import { useCart } from '@/hooks/useCart';
import { CartHeader } from './CartHeader';
import { CartItemsList } from './CartItemsList';
import { CartOrderNote } from './CartOrderNote';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

export default function CartPage() {
  const { items, count, totals, hydrated, note, setNote, updateQuantity, removeItem } = useCart();

  return (
    <div className="bg-cream">
      <CartHeader count={count} />
      <Container className="py-10">
        {!hydrated ? (
          <div className="grid gap-8 lg:grid-cols-3" aria-busy>
            <Skeleton className="h-72 lg:col-span-2" />
            <Skeleton className="h-72" />
          </div>
        ) : items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <CartItemsList
                items={items}
                totals={totals}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
              <CartOrderNote note={note} onChange={setNote} />
            </div>
            <CartSummary count={count} totals={totals} />
          </div>
        )}
      </Container>
    </div>
  );
}
