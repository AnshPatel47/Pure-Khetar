import { PageHero } from '@/components/pages/PageHero';

export function FarmHero() {
  return (
    <PageHero
      bgImage="/images/farm/classic-watering.jpeg"
      eyebrow="Kamana Village · Gujarat, India"
      title={<>Where Every Seed<br /><span className="italic">Tells a Story</span></>}
      description="Since 1972, our family has cultivated Kamana's red soil using Vedic practices. No shortcuts, no synthetic chemicals—just generations of wisdom."
    />
  );
}
