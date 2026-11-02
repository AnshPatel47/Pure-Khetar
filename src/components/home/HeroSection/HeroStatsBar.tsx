'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  prefix?: string;
  num: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { num: 50, suffix: '+', label: 'Years Heritage' },
  { num: 0,  suffix: '%', label: 'Chemical Residue' },
  { num: 12, suffix: 'h', label: 'Farm to Door' },
  { num: 100, suffix: '%', label: 'Vedic Methods' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) {
      setValue(target);
      return;
    }
    const duration = 750;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(Math.round(eased * target));
      if (elapsed < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}{suffix}
    </span>
  );
}

/**
 * Single horizontal stats row at the absolute bottom of the hero section.
 * Sits inside the cream-gradient bottom area so it's always readable.
 * One clean row on all viewports — no duplicates.
 */
export function HeroStatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-0 left-0 right-0 z-20 pb-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-4 items-center gap-2 rounded-2xl border border-sage/20 bg-cream/95 px-3 py-3 shadow-[0_8px_30px_rgba(52,67,43,0.12)] backdrop-blur-md sm:gap-10 sm:px-6">
          {STATS.map(({ num, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.1, duration: 0.5 }}
              className="flex-shrink-0 text-forest"
            >
              <p className="font-serif text-xl sm:text-3xl font-bold text-forest leading-none">
                <Counter target={num} suffix={suffix} />
              </p>
              <p className="mt-1 text-[8px] font-semibold leading-tight tracking-wide text-forest/65 sm:text-xs sm:whitespace-nowrap">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

