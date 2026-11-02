'use client';

import Image from 'next/image';
import { FARM_PHOTOS } from '@/data/farm';

export function FarmPhotoMarquee() {
  const photos = [...FARM_PHOTOS, ...FARM_PHOTOS];

  return (
    <section className="overflow-hidden border-y border-sage/15 bg-cream py-14 sm:py-20" aria-label="Farm photos">
      <div className="mb-7 px-4 text-center sm:px-6">
        <p className="text-xs font-bold uppercase tracking-widest text-sage">Life at Kamana</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-forest">From our fields, every day</h2>
      </div>
      <div className="farm-marquee flex w-max gap-4 px-4 motion-reduce:transform-none">
        {photos.map((photo, index) => (
          <figure key={`${photo.src}-${index}`} className="relative h-52 w-72 shrink-0 overflow-hidden rounded-2xl border border-sage/15 bg-white shadow-card sm:h-64 sm:w-96">
            <Image src={photo.src} alt={photo.title} fill sizes="384px" className="object-cover" loading="lazy" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-cream/90 px-3 py-2 text-xs font-semibold text-forest backdrop-blur-sm">{photo.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
