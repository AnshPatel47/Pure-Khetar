'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { toCartItem, type PurchasableProduct } from '@/lib/cart';

interface AddToCartButtonProps {
  product: PurchasableProduct;
  quantity?: number;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function AddToCartButton({ product, quantity = 1, size = 'sm', fullWidth, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (product.stock <= 0) {
    return (
      <Button variant="outline" size={size} fullWidth={fullWidth} className={className} disabled>
        Sold out
      </Button>
    );
  }

  const handleAdd = () => {
    addItem({ ...toCartItem(product), quantity });
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <Button
      onClick={handleAdd}
      size={size}
      fullWidth={fullWidth}
      variant={added ? 'accent' : 'primary'}
      className={className}
      aria-live="polite"
      leftIcon={added ? <Check className="h-4 w-4" aria-hidden /> : <ShoppingBag className="h-4 w-4" aria-hidden />}
    >
      {added ? 'Added' : 'Add to crate'}
    </Button>
  );
}
