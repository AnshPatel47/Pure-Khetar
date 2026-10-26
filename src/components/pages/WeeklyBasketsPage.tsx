import { Suspense } from 'react';
import { FeaturedProducts, FeaturedProductsSkeleton } from '@/components/home/FeaturedProducts';
import { WeeklyBasketSection } from '@/components/home/WeeklyBasketSection';
import { PageHeader } from './PageHeader';

export function WeeklyBasketsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Opening soon"
        title="Weekly harvest baskets"
        description="One simple basket of fresh seasonal vegetables from our Kamana farm, delivered on a day that suits you."
      />
      <WeeklyBasketSection />
      <div className="bg-white/50">
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </div>
    </>
  );
}
