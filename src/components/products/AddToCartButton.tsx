'use client';

<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  className?: string;
}

export function AddToCartButton({
  id,
  name,
  price,
  unit,
  image,
  className,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, price, unit, image, quantity: 1 });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button type="button" onClick={handleAdd} className={className}>
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" />
          Added
        </>
      ) : (
        <>
          <ShoppingBag className="h-3.5 w-3.5" />
          Add
        </>
      )}
    </button>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  );
}
