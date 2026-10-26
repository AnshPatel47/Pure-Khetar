<<<<<<< HEAD
import { Suspense } from 'react';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts, FeaturedProductsSkeleton } from '@/components/home/FeaturedProducts';
import { HeroSection } from '@/components/home/HeroSection';
import { JourneySection } from '@/components/home/JourneySection';
import { LazyBlogPreview, LazyFarmReels, LazyWeeklyBasket } from '@/components/home/LazyHomeSections';
import { QualitySection } from '@/components/home/QualitySection';
import { TrustStrip } from '@/components/home/TrustStrip';

// The page shell is static; database sections stream in and are refreshed every 2 minutes.
export const revalidate = 120;

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Above the fold: rendered immediately */}
      <HeroSection />
      <TrustStrip />

      {/* Database-driven: streamed in behind skeletons so they never block first paint */}
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <Suspense fallback={null}>
        <CategorySection />
      </Suspense>

      {/* Below the fold: the browser skips rendering them until needed… */}
      <div className="cv-auto">
        <QualitySection />
      </div>
      <div className="cv-auto">
        <JourneySection />
      </div>

      {/* …and these don't even download their code or videos until you scroll close */}
      <LazyFarmReels />
      <LazyWeeklyBasket />
      <LazyBlogPreview />
=======
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedHarvestSection } from '@/components/home/FeaturedHarvestSection';
import { JourneySection } from '@/components/home/JourneySection';
import { QualitySection } from '@/components/home/QualitySection';
import { TrustStrip } from '@/components/home/TrustStrip';

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TrustStrip />
      <FeaturedHarvestSection />
      <QualitySection />
      <JourneySection />
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
    </div>
  );
}