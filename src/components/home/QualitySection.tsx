'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlaskConical, Leaf, Award, Wind, ArrowRight, Sprout, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';


const QUALITY_POINTS = [
  {
    icon: <Wind className="w-5 h-5" />,
    title: 'Net-House Farming',
    desc: '12,000 sq ft protected micro-environment. No pesticides needed.',
    color: 'text-sage bg-sage/10',
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: 'NABL Lab Certified',
    desc: 'Every batch tested for 80+ residues. Results published publicly.',
    color: 'text-terracotta bg-terracotta/10',
  },
  {
    icon: <Leaf className="w-5 h-5" />,
    title: 'A2 Vedic Manure',
    desc: 'Gir Cow dung compost — aged 6 months. Zero synthetic fertilizers.',
    color: 'text-forest bg-forest/8',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'PGS Organic Certified',
    desc: 'India\'s most rigorous grassroots organic certification since 2011.',
    color: 'text-marigold bg-marigold/10',
  },
];

export function QualitySection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
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

              {/* Floating lab badge */}
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

          {/* Content */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-3">
                <Sprout className="w-3.5 h-3.5" />
                Why Pure Khetar
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest leading-tight mb-5">
                Pure Isn&apos;t a Label.<br />
                <span className="text-terracotta">It&apos;s Our Only Standard.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every claim we make — zero pesticides, Vedic manure, morning harvest — 
                is independently verified and publicly documented. Because trust has to be earned, 
                not assumed.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4">
              {QUALITY_POINTS.map((point, i) => (
                <Reveal key={point.title} delay={i * 0.07}>
                  <div className="bg-white rounded-2xl p-5 border border-sage/10 shadow-card card-hover group">
                    <div className={`w-10 h-10 rounded-xl ${point.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      {point.icon}
                    </div>
                    <h3 className="font-serif text-sm font-bold text-forest mb-1.5 group-hover:text-terracotta transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{point.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <Link
                href="/our-farm"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-terracotta transition-colors group"
              >
                See our full farming practices
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
