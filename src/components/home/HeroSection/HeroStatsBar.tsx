'use client';

import { motion } from 'framer-motion';

const STATS = [
  { num: '50+', label: 'Years Heritage' },
  { num: '0%', label: 'Chemical Residue' },
  { num: '12h', label: 'Farm to Door' },
  { num: '100%', label: 'Vedic Methods' },
];

export function HeroStatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="absolute bottom-0 left-0 right-0 z-20 hidden md:block"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center gap-8">
          {STATS.map(({ num, label }) => (
            <div key={label} className="text-cream/90">
              <p className="font-serif text-2xl font-bold text-marigold leading-none">{num}</p>
              <p className="text-[11px] text-cream/60 mt-0.5 font-medium tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
