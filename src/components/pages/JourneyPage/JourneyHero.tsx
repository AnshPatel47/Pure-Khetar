import { PageHero } from '@/components/pages/PageHero';

export function JourneyHero() {
  return (
    <PageHero
      bgImage="/images/farm/classic-watering.jpeg"
      eyebrow="50+ Years of Natural Legacy"
      title={<>The Kamana<br /><span className="italic">Journey</span></>}
      description="From five acres of red Gujarat soil in 1972 to a 100% chemical-free & pesticide-free farm feeding hundreds of families."
    />
  );
}
