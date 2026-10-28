'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function JourneyHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-end overflow-hidden bg-forest">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/farm/classic-watering.jpeg"
          alt="Kamana farm heritage — classic watering"
          fill
          priority
          className="object-cover object-center opacity-50"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-forest via-forest/70 to-forest/30" />

      {/* Animated timeline path preview */}
      <div className="absolute right-0 top-0 bottom-0 w-40 hidden lg:block z-10 opacity-15">
        <svg viewBox="0 0 100 400" className="h-full w-full" preserveAspectRatio="none">
          <path d="M50 0 Q80 100 50 200 Q20 300 50 400" stroke="#E0A528" strokeWidth="2" fill="none" strokeDasharray="6,4" />
        </svg>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl space-y-5"
        >
          <div className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5" />
            50+ Years of Natural Legacy
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cream leading-tight">
            The Kamana<br />
            <span className="gradient-text italic">Journey</span>
          </h1>
          <p className="text-cream/80 text-base leading-relaxed">
            From five acres of red Gujarat soil in 1972 to a certified natural farm feeding
            hundreds of families — this is the story of three generations and one unbreakable promise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
