import Image from 'next/image';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { BLUR_DATA_URL } from '@/lib/constants';

interface PageHeroProps {
  bgImage?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  bgAlt?: string;
}

export function PageHero({
  bgImage = '/images/farm/classic-watering.jpeg',
  eyebrow,
  title,
  description,
  children,
  bgAlt = 'Pure Khetar classic-watering farm, Kamana Gujarat',
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-cream">
      <Image
        src={bgImage}
        alt={bgAlt}
        fill
        priority
        quality={95}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-full max-w-[58rem]"
        style={{ background: 'linear-gradient(to right, rgba(250,246,236,0.96) 0%, rgba(250,246,236,0.82) 48%, rgba(250,246,236,0.48) 72%, transparent 100%)' }}
      />
      <Container className="relative z-20 pt-[96px] pb-16 sm:pb-20">
        <div className="max-w-2xl space-y-5">
          {eyebrow && (
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-forest">
              <span className="h-px w-8 bg-forest" />{eyebrow}
            </p>
          )}
          <h1 className="font-serif text-4xl font-bold leading-[1.08] text-forest sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          {description && <p className="max-w-xl text-base leading-relaxed text-forest/75 sm:text-lg">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
