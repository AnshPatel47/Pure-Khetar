'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Truck, Sprout, Leaf, Star, Clock } from 'lucide-react';
import { fadeUp } from './FloatingCards';

const TRUST_PROPS = [
  { icon: <ShieldCheck className="w-4 h-4 text-marigold" />, text: '0% Chemicals & Pesticides' },
  { icon: <Truck className="w-4 h-4 text-marigold" />, text: 'Morning Harvest Delivery' },
  { icon: <Star className="w-4 h-4 text-marigold" />, text: '50+ Yrs Farming Legacy' },
  { icon: <Clock className="w-4 h-4 text-marigold" />, text: 'Harvested by 6 AM Daily' },
];

export function HeroContent() {
  return (
    <div className="max-w-[640px] space-y-7">
      {/* Glowing badge */}
      <motion.div {...fadeUp(0)}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/25 text-marigold text-xs font-bold uppercase tracking-widest shadow-glow-gold">
          <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sprout className="w-3.5 h-3.5" />
          </motion.span>
          <span>Kamana Farm · Est. 1972 · Gujarat</span>
          <span className="w-1.5 h-1.5 rounded-full bg-marigold animate-pulse-ring" />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fadeUp(0.15)}
        className="font-serif text-[2.6rem] sm:text-6xl lg:text-7xl font-bold text-cream leading-[1.08] drop-shadow-lg"
      >
        ROOTED IN NATURE,
        <br />
        <span className="text-marigold">CULTIVATED WITH CARE.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p {...fadeUp(0.3)} className="text-base sm:text-lg text-cream/80 leading-relaxed font-light max-w-lg">
        Nourished with Gir Cow A2 Vedic manure and harvested daily at sunrise.
        Delivered straight to your doorstep — guaranteed purity, every morning.
      </motion.p>

      {/* Action Buttons */}
      <motion.div {...fadeUp(0.45)} className="flex flex-wrap items-center gap-3 pt-1">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 bg-marigold text-forest px-7 py-4 rounded-full font-bold text-sm shadow-glow-gold hover:bg-white hover:shadow-organic-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <Leaf className="w-4 h-4" />
          <span>Explore Fresh Produce</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>

        <Link
          href="/our-farm"
          className="inline-flex items-center gap-2 glass border border-white/30 text-cream px-7 py-4 rounded-full font-bold text-sm hover:bg-white/15 transition-all duration-300"
        >
          <span>Our Farm Story</span>
        </Link>
      </motion.div>

      {/* Trust Props Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.65 }}
        className="pt-7 border-t border-white/12"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-xs text-cream/75">
          {TRUST_PROPS.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              {icon}
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
