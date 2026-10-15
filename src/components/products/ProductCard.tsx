'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@prisma/client';
import { useCartStore } from '@/store/cart.store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = React.useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.images[0] || '/images/products/ringan.jpeg',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-3xl p-4 border border-[#7A9A6B]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        <Link href={`/products/${product.slug}`} className="block relative w-full h-56 rounded-2xl overflow-hidden bg-[#FAF6EC] mb-4">
          <Image
            src={product.images[0] || '/images/products/ringan.jpeg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.isOrganic && (
            <span className="absolute top-3 left-3 bg-[#E0A528] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              100% Organic
            </span>
          )}
        </Link>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-lg font-bold text-[#1F4D2E] group-hover:text-[#C86D3B] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</p>
      </div>

      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-400">Price / {product.unit}</span>
          <p className="font-serif text-lg font-bold text-[#1F4D2E]">₹{product.price}</p>
        </div>
        
        <button
          type="button"
          onClick={handleAddToCart}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-md ${
            added
              ? 'bg-[#C86D3B] text-white'
              : 'bg-[#1F4D2E] text-white hover:bg-[#1F4D2E]/90'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Crate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}