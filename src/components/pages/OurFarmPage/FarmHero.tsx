'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function FarmHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[75vh] flex items-end overflow-hidden bg-forest"
    >
      {/* BG Image */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
        <Image
          src="/images/farm/nethouse-farming.jpeg"
          alt="Kamana Net-House Natural Farm Gujarat"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-forest/95 via-forest/50 to-forest/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-forest/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-2xl space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            <Leaf className="w-3.5 h-3.5" />
            Kamana Village · Gujarat, India
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl font-bold text-cream leading-tight"
          >
            Where Every Seed<br />
            <span className="gradient-text italic">Tells a Story</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="text-cream/80 text-base sm:text-lg leading-relaxed"
          >
            Since 1972, Patel Sureshbhai&apos;s family has cultivated Kamana&apos;s red soil
            using only Vedic practices. No shortcuts. No chemicals. Just pure intention and
            generations of wisdom.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
