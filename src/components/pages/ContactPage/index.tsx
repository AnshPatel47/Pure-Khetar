import { ContactChannels } from './ContactChannels';
import { ContactForm } from './ContactForm';
import { ContactMap } from './ContactMap';
import { Container } from '@/components/layout/Container';
import { PageHero } from '@/components/pages/PageHero';

export function ContactPage() {
  return (
    <>
      <PageHero
        bgImage="/images/farm/Farming.jpeg"
        eyebrow="Get in touch"
        title="Talk to the farm"
        description="Questions about an order, a crop or our farming? Our team will be happy to help."
      />
      <Container className="py-14 sm:py-16">
        <ContactChannels />
        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactMap />
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
