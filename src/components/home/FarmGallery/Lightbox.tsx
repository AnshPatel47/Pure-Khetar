'use client';

import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { SmartImage } from '@/components/ui/SmartImage';

type MediaItem = {
  type: 'photo' | 'video';
  src: string;
  title: string;
  caption: string;
  poster?: string;
};

interface LightboxProps {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative mx-4 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Media */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
          {item.type === 'video' ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              autoPlay
              className="h-full w-full object-contain"
            />
          ) : (
            <SmartImage src={item.src} alt={item.title} fill className="object-contain" />
          )}
        </div>

        {/* Caption */}
        <div className="mt-4 text-center text-cream">
          <p className="font-serif text-lg font-bold">{item.title}</p>
          <p className="mt-1 text-sm text-cream/70">{item.caption}</p>
        </div>

        {/* Nav arrows */}
        {index > 0 && (
          <button
            onClick={onPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {index < items.length - 1 && (
          <button
            onClick={onNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}

export type { MediaItem };
