import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';
import { formatPrice } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
  onNavigate?: () => void;
}

export function CartItem({ item, onQuantityChange, onRemove, onNavigate }: CartItemProps) {
  const atMax = item.quantity >= item.stock;
  const title = (
    <h3 className="truncate font-serif text-sm font-bold text-forest">{item.name}</h3>
  );

  return (
    <li className="flex items-center gap-4 rounded-2xl border border-sage/20 bg-white p-4 shadow-sm">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
        <SmartImage src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        {item.slug ? (
          <Link href={`/products/${item.slug}`} onClick={onNavigate} className="hover:text-terracotta">
            {title}
          </Link>
        ) : (
          title
        )}
        <p className="text-xs text-forest/55">
          {formatPrice(item.price)} / {item.unit}
        </p>

        <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-sage/25" role="group" aria-label={`Quantity of ${item.name}`}>
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity - 1)}
            aria-label={`Decrease quantity of ${item.name}`}
            className="p-1.5 text-forest/70 transition-colors hover:bg-forest/5"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="min-w-[1.75rem] text-center text-xs font-bold text-forest" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity + 1)}
            disabled={atMax}
            aria-label={`Increase quantity of ${item.name}`}
            className="p-1.5 text-forest/70 transition-colors hover:bg-forest/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <p className="font-serif text-sm font-bold text-forest">{formatPrice(item.price * item.quantity)}</p>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="rounded-md p-1 text-forest/40 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
