import { PageHero } from '@/components/pages/PageHero';

export function TeamHero() {
  return (
    <PageHero
      bgImage="/images/farm/classic-watering.jpeg"
      eyebrow="The Faces Behind the Farm"
      title={<>Three Generations,<br /><span className="italic">One Mission</span></>}
      description="Pure Khetar is the shared lifetime work of the farm family and the next generation bringing it to your table."
    />
  );
}
