import { CalendarCheck, Leaf, MessageCircle, PackageCheck } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SmartImage } from '@/components/ui/SmartImage';
import { SITE, whatsappLink } from '@/lib/constants';

const STEPS = [
  { icon: Leaf, text: 'We pick the best of the week from our fields' },
  { icon: PackageCheck, text: 'Your basket is packed fresh for your family' },
  { icon: CalendarCheck, text: 'It arrives at your door on your chosen day' },
];

export function WeeklyBasketSection() {
  return (
    <Container as="section" className="py-16 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-forest text-cream">
        <div className="grid items-stretch lg:grid-cols-2">
          <div className="relative min-h-[260px] lg:min-h-[420px]">
            <SmartImage
              src="/images/products/fulawar.jpeg"
              alt="Rows of cauliflower growing at our farm"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest" />
          </div>

          <div className="space-y-6 p-8 sm:p-12">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-marigold">Weekly baskets · opening soon</p>
              <h2 className="font-serif text-3xl font-bold leading-tight text-balance sm:text-4xl">
                A basket of the season&apos;s best, every week
              </h2>
              <p className="text-base leading-relaxed text-cream/75">
                Skip the shopping list. Tell us you are interested and we will message you as soon as weekly baskets
                open on {SITE.name}.
              </p>
            </div>

            <ul className="space-y-3">
              {STEPS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-cream/85">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-marigold">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button
                href={whatsappLink(`Hello ${SITE.name}! Please add me to the weekly basket waitlist.`)}
                variant="accent"
                leftIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
              >
                Join the waitlist
              </Button>
              <Button href="/weekly-baskets" variant="glass">
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
