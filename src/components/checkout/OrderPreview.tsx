import { Sprout, Truck } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice } from '@/lib/utils';
import type { CartItem, CartTotals } from '@/types/cart';

export function OrderPreview({ items, totals }: { items: CartItem[]; totals: CartTotals }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-sage/10 bg-white shadow-card">
      <div className="bg-forest px-5 py-4">
        <h3 className="flex items-center gap-2 font-serif text-base font-bold text-cream">
          <Sprout className="h-4 w-4 text-marigold" aria-hidden />
          Order preview
        </h3>
      </div>

      <div className="space-y-4 p-5">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <span className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border border-sage/10 bg-cream">
                <SmartImage src={item.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-forest">{item.name}</p>
                <p className="text-[10px] text-forest/50">
                  × {item.quantity} {item.unit}
                </p>
              </div>
              <p className="text-xs font-bold text-forest">{formatPrice(item.price * item.quantity)}</p>
            </li>
          ))}
        </ul>

        <dl className="space-y-2 border-t border-sage/10 pt-4 text-sm">
          <div className="flex justify-between text-forest/60">
            <dt>Subtotal</dt>
            <dd>{formatPrice(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-forest/60">
            <dt>Delivery</dt>
            <dd className={totals.deliveryFee === 0 ? 'font-semibold text-sage' : ''}>
              {totals.deliveryFee === 0 ? 'Free' : formatPrice(totals.deliveryFee)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-sage/10 pt-2 text-base font-bold text-forest">
            <dt>Total</dt>
            <dd className="font-serif text-lg">{formatPrice(totals.total)}</dd>
          </div>
        </dl>

        <p className="flex items-center gap-2.5 rounded-2xl border border-sage/10 bg-sage/5 p-3.5 text-[11px] font-medium text-forest/65">
          <Truck className="h-4 w-4 flex-shrink-0 text-forest" aria-hidden />
          Harvested fresh and delivered in the time window you choose.
        </p>
      </div>
    </div>
  );
}
