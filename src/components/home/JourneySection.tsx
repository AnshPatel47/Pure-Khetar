'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Sprout, ArrowRight, Leaf } from 'lucide-react';

function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function JourneySection() {
  return (
    <section className="bg-forest relative overflow-hidden py-20 lg:py-28">
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #E0A528 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image stack */}
          <Reveal>
            <div className="relative">
              <div className="aspect-[4/3] rounded-4xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/farm/classic-watering.jpeg"
                  alt="Kamana farm classic watering — 50 year heritage"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-marigold text-forest rounded-2xl px-4 py-3 shadow-glow-gold"
              >
                <p className="font-serif text-2xl font-bold leading-none">50+</p>
                <p className="text-[11px] font-bold leading-none mt-0.5">Years of Heritage</p>
              </motion.div>

              {/* Bottom overlay text */}
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

          {/* Content */}
          <Reveal delay={0.15}>
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-marigold uppercase tracking-widest mb-4">
              <Sprout className="w-3.5 h-3.5" />
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-5">
              Three Generations.<br />
              <span className="text-marigold italic">One Unbreakable Promise.</span>
            </h2>
            <p className="text-cream/70 leading-relaxed text-base mb-5">
              Since 1972, our family has cultivated Kamana&apos;s red soil using only Vedic 
              practices. No shortcuts. No chemicals. Just the same seeds, the same sunrises, 
              and the same love for the land that sustained generations before us.
            </p>
            <p className="text-cream/70 leading-relaxed text-base mb-8">
              Today, Het&apos;s net-house engineering and Ansh&apos;s direct-to-consumer vision 
              bring that same tradition straight to your kitchen — faster and fresher than ever.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/journey"
                className="group inline-flex items-center gap-2 bg-marigold text-forest px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold"
              >
                Read Our Full Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 glass border border-white/25 text-cream px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/15 transition-colors"
              >
                Meet the Team
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
