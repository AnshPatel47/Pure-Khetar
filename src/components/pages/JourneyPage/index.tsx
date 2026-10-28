import { JourneyHero } from './JourneyHero';
import { MilestonesStrip } from './MilestonesStrip';
import { JourneyTimeline } from './JourneyTimeline';
import { WaterStorySection } from './WaterStorySection';
import { JourneyCTA } from './JourneyCTA';

export default function JourneyPage() {
  return (
    <div className="bg-cream overflow-x-hidden">
      <JourneyHero />
      <MilestonesStrip />
      <JourneyTimeline />
      <WaterStorySection />
      <JourneyCTA />
    </div>
  );
}
