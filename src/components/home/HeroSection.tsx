'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
<<<<<<< HEAD
import { motion, useScroll, useTransform } from 'framer-motion';
import { BLUR_DATA_URL } from '@/lib/constants';
=======
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
import { ArrowRight, ShieldCheck, Truck, Sprout, Leaf, Star, Clock } from 'lucide-react';

/* ─── Stagger helpers ──────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─── Floating badge card ──────────────────────────────────────────── */
function FloatingCard({
  icon,
  label,
  value,
  className,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'backOut' }}
      className={`glass-cream rounded-2xl p-3.5 shadow-card flex items-center gap-3 ${className ?? ''}`}
    >
      <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-forest leading-tight">{value}</p>
      </div>
    </motion.div>
  );
}

/* ─── Hero Section ─────────────────────────────────────────────────── */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  /* Parallax transforms */
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
<<<<<<< HEAD
=======
  const smoothBgY = useSpring(bgY, { stiffness: 60, damping: 20 });
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-forest"
    >
      {/* ── Background Farm Image with Parallax ── */}
      <motion.div
<<<<<<< HEAD
        style={{ y: bgY }}
        className="absolute inset-0 z-0 scale-105 will-change-transform"
=======
        style={{ y: smoothBgY }}
        className="absolute inset-0 z-0 scale-105"
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
      >
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
<<<<<<< HEAD
          transition={{ duration: 8, ease: 'easeOut' }}
=======
          transition={{ duration: 12, ease: 'easeOut' }}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
          className="absolute inset-0"
        >
          <Image
            src="/images/farm/nethouse-farming.jpeg"
            alt="Pure Khetar Net-House Organic Farm, Kamana Gujarat"
            fill
            priority
<<<<<<< HEAD
            quality={80}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
=======
            sizes="100vw"
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* ── LAYER 1: Left shadow-fade (main text readability) ── */}
      <div className="absolute inset-0 z-10 overlay-forest-left" />

      {/* ── LAYER 2: Vignette darkening ── */}
      <div className="absolute inset-0 z-10 overlay-dark-vignette" />

      {/* ── LAYER 3: Bottom cream blend into page background ── */}
      <div className="absolute inset-0 z-10 overlay-forest-bottom" />

      {/* ── LAYER 4: Subtle grain texture ── */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.6,
        }}
      />

      {/* ── Hero Content ── */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"
      >
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
            Pure, Vedic &{' '}
            <br />
            <span className="relative inline-block">
              <span className="gradient-text italic">Residue-Free</span>
              {/* underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-marigold to-terracotta origin-left rounded-full"
              />
            </span>{' '}
            <br className="hidden sm:block" />
            Organic Harvest.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-cream/80 leading-relaxed font-light max-w-lg"
          >
            Nourished with Gir Cow A2 Vedic manure and harvested daily at sunrise.
            Delivered straight to your doorstep — guaranteed purity, every morning.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            {...fadeUp(0.45)}
            className="flex flex-wrap items-center gap-3 pt-1"
          >
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
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-marigold" />, text: '0% Chemicals & Pesticides' },
                { icon: <Truck className="w-4 h-4 text-marigold" />, text: 'Morning Harvest Delivery' },
                { icon: <Star className="w-4 h-4 text-marigold" />, text: '50+ Yrs Farming Legacy' },
                { icon: <Clock className="w-4 h-4 text-marigold" />, text: 'Harvested by 6 AM Daily' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  {icon}
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right Floating Cards (visible lg+) ── */}
      <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 z-20 space-y-4">
        <FloatingCard
          icon={<ShieldCheck className="w-5 h-5" />}
          label="Verified Quality"
          value="100% Lab Tested Pure"
          delay={0.5}
          className="animate-float"
        />
        <FloatingCard
          icon={<Truck className="w-5 h-5" />}
          label="Delivery"
          value="Within 6–12 hrs of Harvest"
          delay={0.65}
          className="animate-float-slow"
        />
        <FloatingCard
          icon={<Leaf className="w-5 h-5" />}
          label="Method"
          value="Net-House Organic Farming"
          delay={0.8}
        />
      </div>

      {/* ── Stats bar at bottom ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-20 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex items-center gap-8">
            {[
              { num: '50+', label: 'Years Heritage' },
              { num: '0%', label: 'Chemical Residue' },
              { num: '12h', label: 'Farm to Door' },
              { num: '100%', label: 'Vedic Methods' },
            ].map(({ num, label }) => (
              <div key={label} className="text-cream/90">
                <p className="font-serif text-2xl font-bold text-marigold leading-none">{num}</p>
                <p className="text-[11px] text-cream/60 mt-0.5 font-medium tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}