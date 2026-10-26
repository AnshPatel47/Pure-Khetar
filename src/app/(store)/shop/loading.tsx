<<<<<<< HEAD
import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ShopLoading() {
  return (
    <Container className="space-y-8 py-10" aria-busy>
      <Skeleton className="h-48 w-full rounded-3xl bg-forest/15" />
      <Skeleton className="h-12 w-full max-w-xl rounded-full" />
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-10 w-32 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 rounded-3xl border border-sage/10 bg-white p-4">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
    </Container>
  );
}
=======
import React from 'react';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="bg-[#1F4D2E]/20 rounded-3xl h-48 w-full" />

      {/* Pills Skeleton */}
      <div className="flex gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-28 bg-[#7A9A6B]/20 rounded-full" />
        ))}
      </div>

      {/* Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 space-y-4">
            <div className="h-56 bg-gray-200 rounded-2xl w-full" />
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-1/2" />
            <div className="h-10 bg-gray-200 rounded-full w-full mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
