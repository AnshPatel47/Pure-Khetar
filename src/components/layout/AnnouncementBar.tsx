'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ANNOUNCEMENTS } from '@/data/navigation';

/** Rotating one-line notice above the header. Pauses on hover and for reduced-motion users. */
export function AnnouncementBar() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length), 4000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  return (
    <div
      className="overflow-hidden bg-forest px-4 py-2 text-[11px] font-medium text-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="mx-auto flex h-4 max-w-7xl items-center justify-center text-center tracking-wide" aria-live="off">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="truncate"
          >
            {ANNOUNCEMENTS[index]}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  );
}
