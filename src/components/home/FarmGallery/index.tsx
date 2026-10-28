'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Video, Camera } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { LazyVideo } from '@/components/ui/LazyVideo';
import { SmartImage } from '@/components/ui/SmartImage';
import { FARM_PHOTOS, FARM_VIDEOS } from '@/data/farm';
import { Lightbox } from './Lightbox';
import { GalleryTabs } from './GalleryTabs';
import type { Tab } from './GalleryTabs';

export function FarmGallery() {
  const [tab, setTab] = useState<Tab>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = [
    ...FARM_PHOTOS.map((p) => ({ type: 'photo' as const, src: p.src, title: p.title, caption: p.caption })),
    ...FARM_VIDEOS.map((v) => ({ type: 'video' as const, src: v.src, poster: v.poster, title: v.title, caption: v.caption })),
  ];

  const filtered =
    tab === 'photos' ? allItems.filter((i) => i.type === 'photo') :
    tab === 'videos' ? allItems.filter((i) => i.type === 'video') :
    allItems;

  return (
    <Container as="section" className="py-16 lg:py-24">
      {/* Header */}
      <Reveal>
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-terracotta">
              <Camera className="h-3.5 w-3.5" /> Real Farm · No Stock Photos
            </p>
            <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
              Life on our farm in Kamana
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-forest/60">
              Every photo and video you see here is from our actual fields — no studio, no filters.
              This is the land that grows your vegetables.
            </p>
          </div>
          <GalleryTabs tab={tab} onTabChange={setTab} totalCount={allItems.length} />
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {filtered.map((item, idx) => (
            <motion.div
              key={`${item.type}-${item.src}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, delay: idx * 0.02 }}
              onClick={() => setLightboxIndex(allItems.indexOf(item))}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-sage/10 shadow-card"
            >
              {item.type === 'video' ? (
                <>
                  <LazyVideo src={item.src} poster={item.poster} label={item.title} className="h-full w-full" />
                  <div className="absolute inset-0 flex items-center justify-center bg-forest/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-forest shadow-lg">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                  </div>
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-forest/80 px-2 py-0.5 text-[10px] font-bold text-cream backdrop-blur-sm">
                    <Video className="h-2.5 w-2.5" /> Video
                  </span>
                </>
              ) : (
                <>
                  <SmartImage
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </>
              )}

              {/* Caption overlay */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-forest/85 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
                <p className="text-xs font-bold text-cream">{item.title}</p>
                <p className="mt-0.5 text-[10px] text-cream/75">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={allItems}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : null))}
            onNext={() => setLightboxIndex((i) => (i !== null ? Math.min(allItems.length - 1, i + 1) : null))}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}
