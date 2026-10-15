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
    </div>
  );
}