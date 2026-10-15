'use client';

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
  );
}
