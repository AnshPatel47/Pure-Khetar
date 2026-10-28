'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function JourneyImage() {
  return (
    <Reveal>
      <div className="relative">
        <div className="aspect-[4/3] rounded-4xl overflow-hidden shadow-2xl">
          <Image src="/images/farm/classic-watering.jpeg" alt="Kamana farm classic watering — 50 year heritage" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
        </div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-4 -right-4 bg-marigold text-forest rounded-2xl px-4 py-3 shadow-glow-gold">
          <p className="font-serif text-2xl font-bold leading-none">50+</p>
          <p className="text-[11px] font-bold leading-none mt-0.5">Years of Heritage</p>
        </motion.div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3">
            <Leaf className="w-5 h-5 text-marigold flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-cream">Kamana Village, Gujarat</p>
              <p className="text-[10px] text-cream/60">Est. 1972 by Patel Sureshbhai</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
