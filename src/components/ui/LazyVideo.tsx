'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface LazyVideoProps {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}

/**
 * A looping, muted video that:
 *  • downloads NOTHING until it is near the viewport (only the light poster image loads),
 *  • plays only while visible and pauses when scrolled away (saves data and battery),
 *  • respects "reduce motion" and gives the visitor a pause / play button.
 */
export function LazyVideo({ src, poster, label, className }: LazyVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadRef, nearViewport] = useInView<HTMLDivElement>({ rootMargin: '300px', once: true });
  const [visibleRef, visible] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [userPaused, setUserPaused] = useState(false);

  const shouldPlay = visible && !userPaused && !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !nearViewport) return;
    if (shouldPlay) void video.play().catch(() => undefined);
    else video.pause();
  }, [shouldPlay, nearViewport]);

  return (
    <div
      ref={(node) => {
        (loadRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        (visibleRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn('relative overflow-hidden bg-forest/10', className)}
    >
      <video
        ref={videoRef}
        src={nearViewport ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="h-full w-full object-cover"
      />

      <button
        type="button"
        onClick={() => setUserPaused((paused) => !paused)}
        aria-label={shouldPlay ? `Pause video: ${label}` : `Play video: ${label}`}
        onClickCapture={() => reduceMotion && videoRef.current?.play().catch(() => undefined)}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-forest/70 text-cream backdrop-blur transition hover:bg-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold"
      >
        {shouldPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
    </div>
  );
}
