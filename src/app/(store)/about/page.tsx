import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/pages/PageHero';
import { TeamCards } from '@/components/pages/TeamPage/TeamCards';
import { TeamValues } from '@/components/pages/TeamPage/TeamValues';
import { JourneyTimeline } from '@/components/pages/JourneyPage/JourneyTimeline';

export default function Page() {
  return (
    <>
      <PageHero
        bgImage="/images/farm/watering.jpeg"
        eyebrow="Our family farm"
        title={<>Three generations,<br /><span className="text-sage">one mission</span></>}
        description="A family-led farm growing fresh, 100% chemical-free & pesticide-free produce in Kamana, Gujarat."
      />
      <Container className="pt-14 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-sage">The people behind Pure Khetar</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-forest sm:text-4xl">Meet our team</h2>
      </Container>
      <JourneyTimeline />
      <TeamCards />
      <TeamValues />
    </>
  );
}