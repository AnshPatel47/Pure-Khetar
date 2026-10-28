'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function QualityImage() {
  return (
    <Reveal>
      <div className="relative">
        <div className="aspect-[4/3] rounded-4xl overflow-hidden shadow-organic-lg">
          <Image
            src="/images/farm/nethouse-farming.jpeg"
            alt="Net-house farming quality — Pure Khetar"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 via-transparent to-transparent" />
        </div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-5 -right-5 glass-cream rounded-2xl p-4 shadow-card border border-sage/20 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-cream" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Batch Certified</p>
            <p className="text-sm font-bold text-forest">0ppm Pesticides</p>
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}
