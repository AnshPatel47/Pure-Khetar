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