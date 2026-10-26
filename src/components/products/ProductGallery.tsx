'use client';

import { useState } from 'react';
import { SmartImage } from '@/components/ui/SmartImage';
import { cn } from '@/lib/utils';
import { FALLBACK_PRODUCT_IMAGE } from '@/lib/constants';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const photos = images.length > 0 ? images : [FALLBACK_PRODUCT_IMAGE];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-sage/15 bg-cream shadow-card sm:aspect-[4/3] lg:aspect-[4/5]">
        <SmartImage
          key={photos[active]}
          src={photos[active]}
          alt={`${name} — photo ${active + 1} of ${photos.length}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="animate-fade-in object-cover"
        />
      </div>

      {photos.length > 1 && (
        <ul className="flex gap-3" aria-label="Product photos">
          {photos.map((photo, index) => (
            <li key={photo}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={index === active}
                className={cn(
                  'relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold',
                  index === active ? 'border-forest' : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <SmartImage src={photo} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
