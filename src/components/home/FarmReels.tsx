'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { LazyVideo } from '@/components/ui/LazyVideo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { FARM_PHOTOS, FARM_VIDEOS } from '@/data/farm';

const CARD = 'relative aspect-[3/4] w-[72%] shrink-0 snap-center overflow-hidden rounded-3xl shadow-card sm:w-auto';

function Caption({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/85 to-transparent p-5 pt-16">
      <p className="font-serif text-lg font-bold text-cream">{title}</p>
      <p className="mt-0.5 text-xs text-cream/75">{caption}</p>
    </div>
  );
}

/** Real farm videos and photos — shows first 3 videos and 1 photo. Videos only download when scrolled near. */
export function FarmReels() {
  // Show first 3 videos from the data
  const videos = FARM_VIDEOS.slice(0, 3);
  const photo = FARM_PHOTOS[0];

  return (
    <Container as="section" className="py-16 lg:py-24">
      <SectionHeading
        eyebrow="See it for yourself"
        title="Life on our farm in Kamana"
        description="No studio, no stock photos — this is the field your vegetables come from."
        action={{ label: 'See all farm media', href: '/our-farm' }}
        className="mb-10"
      />

      <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {videos.map((video) => (
          <div key={video.id} className={CARD}>
            <LazyVideo src={video.src} poster={video.poster} label={video.title} className="h-full w-full" />
            <Caption title={video.title} caption={video.caption} />
          </div>
        ))}

        {photo && (
          <div className={`${CARD} hidden lg:block`}>
            <SmartImage src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 33vw, 72vw" className="object-cover" />
            <Caption title={photo.title} caption={photo.caption} />
          </div>
        )}
      </div>

      {/* Mobile CTA */}
      <div className="mt-8 text-center sm:hidden">
        <Link href="/our-farm" className="inline-flex items-center gap-1.5 text-sm font-bold text-forest">
          Visit the farm page <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
