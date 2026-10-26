import Image from 'next/image';
import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { BLUR_DATA_URL } from '@/lib/constants';

interface PageHeroProps {
  /** Background farm photo path */
  bgImage: string;
  /** Short eyebrow label in marigold */
  eyebrow?: string;
  /** Main H1 — keep to 1–2 lines */
  title: ReactNode;
  /** One-line description max */
  description?: string;
  /** Extra content below the description (e.g. filters, stats) */
  children?: ReactNode;
  /** Alt text for the background */
  bgAlt?: string;
}

/**
 * Shared hero banner used at the top of every content page.
 * Consistent width, padding, sizing & dark-overlay treatment across all pages.
 */
export function PageHero({
  bgImage,
  eyebrow,
  title,
  description,
  children,
  bgAlt = 'Pure Khetar farm, Kamana Gujarat',
}: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(260px, 36vw, 420px)' }}>
      {/* Background photo */}
      <Image
        src={bgImage}
        alt={bgAlt}
        fill
        priority
        quality={75}
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        className="object-cover object-center"
      />

      {/* Dark shade layers — uniform across all pages */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/65 to-forest/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-forest/30 to-transparent" />

      {/* Grain texture for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content — same max-width and padding as the rest of the site */}
      <Container className="relative z-10 flex flex-col justify-center py-16 sm:py-20">
        <div className="max-w-2xl space-y-3">
          {eyebrow && (
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-marigold">
              <span className="h-px w-6 bg-marigold" />
              {eyebrow}
            </p>
          )}
          <h1 className="font-serif text-3xl font-bold leading-tight text-cream drop-shadow-md sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">{description}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
