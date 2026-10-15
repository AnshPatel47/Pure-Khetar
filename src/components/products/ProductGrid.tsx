import React from 'react';
import type { Product } from '@prisma/client';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-[#7A9A6B]/20 p-8">
        <p className="font-serif text-xl font-bold text-[#1F4D2E]">No products found</p>
        <p className="text-xs text-gray-500 mt-1">Check back soon for upcoming Kamana farm harvests!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}