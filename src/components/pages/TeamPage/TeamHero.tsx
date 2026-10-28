'use client';

import { motion } from 'framer-motion';
import { Sprout, Leaf } from 'lucide-react';

export function TeamHero() {
  return (
    <section className="relative bg-forest overflow-hidden">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #E0A528 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Leaf decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -right-20 w-80 h-80 opacity-5"
      >
        <Leaf className="w-full h-full text-marigold" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Sprout className="w-3.5 h-3.5" />
            The Faces Behind the Farm
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cream leading-tight mb-5">
            Three Generations,<br />
            <span className="gradient-text italic">One Mission</span>
          </h1>
          <p className="text-cream/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Pure Khetar isn&apos;t a faceless brand. It&apos;s Sureshbhai&apos;s lifetime of farming wisdom,
            Het&apos;s engineering innovation, and Ansh&apos;s mission to bring it all to your table.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
