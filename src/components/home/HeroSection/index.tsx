'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BLUR_DATA_URL } from '@/lib/constants';
import { HeroContent } from './HeroContent';
import { HeroStatsBar } from './HeroStatsBar';

/**
 * Site-wide hero shell.
 * - min-height = 100svh so the sky is always visible above the navbar
 * - Navbar is transparent so the photo bleeds behind it
 * - Content starts below 96px navbar height using pt-[96px]
 * - Soft cream gradient ONLY behind the left content area; right photo stays clear
 * - No whole-image dark overlay that kills the sky
 */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY   = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-forest"
    >
      {/* ── Background Farm Image with slow parallax ─────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-105 will-change-transform">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src="/images/farm/classic-watering.jpeg"
            alt="Pure Khetar — classic channel irrigation at Kamana, Gujarat"
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

      {/* ── Overlays ─────────────────────────────────────────────────── */}
      {/* Left-side cream gradient — ONLY behind the content, not the whole image */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(250,246,236,0.96) 0%, rgba(250,246,236,0.86) 38%, rgba(250,246,236,0.50) 58%, transparent 78%)',
        }}
      />
      {/* Bottom vignette so the stats bar floats over clearly */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(250,246,236,1) 0%, rgba(250,246,236,0.5) 40%, transparent 100%)',
        }}
      />
      {/* Subtle noise grain */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Hero Content ──────────────────────────────────────────────── */}
      {/*
        pt-[96px]: push content below the transparent navbar (96px tall at top).
        pb-28: leave room for the stats bar above the page body.
      */}
      <motion.div
        style={{ y: textY }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[96px] pb-32 will-change-transform"
      >
        <HeroContent />
      </motion.div>

      {/* ── Stats row ────────────────────────────────────────────────── */}
      <HeroStatsBar />
    </section>
  );
}

