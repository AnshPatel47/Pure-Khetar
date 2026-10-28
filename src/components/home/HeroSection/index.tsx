'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BLUR_DATA_URL } from '@/lib/constants';
import { HeroContent } from './HeroContent';
import { HeroFloatingCards } from './FloatingCards';
import { HeroStatsBar } from './HeroStatsBar';

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-forest"
    >
      {/* Background Farm Image with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-105 will-change-transform">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src="/images/farm/nethouse-farming.jpeg"
            alt="Pure Khetar Net-House Natural Farm, Kamana Gujarat"
            fill
            priority
            quality={80}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      {/* Overlay layers */}
      <div className="absolute inset-0 z-10 overlay-forest-left" />
      <div className="absolute inset-0 z-10 overlay-dark-vignette" />
      <div className="absolute inset-0 z-10 overlay-forest-bottom" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.6,
        }}
      />

      {/* Hero Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full"
      >
        <HeroContent />
      </motion.div>

      <HeroFloatingCards />
      <HeroStatsBar />
    </section>
  );
}
