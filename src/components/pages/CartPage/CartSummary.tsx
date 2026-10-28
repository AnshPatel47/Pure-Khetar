import { ArrowRight, Shield, Sprout, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import type { CartTotals } from '@/types/cart';

const REASSURANCES = [
  { icon: Truck, text: 'Harvested fresh and delivered in your chosen window' },
  { icon: Shield, text: 'Pay only when your order arrives' },
  { icon: Sprout, text: 'Questions? WhatsApp the farm team any time' },
];

export function CartSummary({ count, totals }: { count: number; totals: CartTotals }) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-3xl border border-sage/10 bg-white shadow-card">
        <div className="p-6">
          <h2 className="mb-5 font-serif text-xl font-bold text-forest">Order summary</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between text-forest/65">
              <dt>Subtotal ({count} items)</dt>
              <dd className="font-semibold text-forest">{formatPrice(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-forest/65">
              <dt>Delivery</dt>
              <dd className={totals.deliveryFee === 0 ? 'font-semibold text-sage' : 'font-semibold text-forest'}>
                {totals.deliveryFee === 0 ? 'Free' : formatPrice(totals.deliveryFee)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-sage/10 pt-3 text-base font-bold text-forest">
              <dt>Total</dt>
              <dd className="font-serif text-xl">{formatPrice(totals.total)}</dd>
            </div>
          </dl>
        </div>
        <div className="px-6 pb-6">
          <Button href="/checkout" size="lg" fullWidth rightIcon={<ArrowRight className="h-4 w-4" aria-hidden />}>
            Proceed to checkout
          </Button>
          <p className="mt-3 text-center text-xs text-forest/45">You pay only when your order arrives.</p>
        </div>
      </div>
      <ul className="space-y-3 rounded-2xl border border-sage/10 bg-cream p-4">
        {REASSURANCES.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-xs font-medium text-forest/70">
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-sage/10 bg-white shadow-sm">
              <Icon className="h-4 w-4 text-forest" aria-hidden />
            </span>
            {text}
          </li>
        ))}
      </ul>
    </aside>
  );
}
