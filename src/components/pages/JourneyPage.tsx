'use client';

<<<<<<< HEAD
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
=======
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
import {
  Sprout, Droplets, Leaf, Award, ArrowRight,
  TreePine, FlaskConical
} from 'lucide-react';
<<<<<<< HEAD
import { Reveal } from '@/components/ui/Reveal';

=======

/* ─── Reveal helper ─────────────────────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-70px 0px' });
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
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb

/* ─── Timeline Data ─────────────────────────────────────────────────── */
const TIMELINE = [
  {
    year: '1972',
    title: 'A Seed of Purpose',
    desc: 'Patel Sureshbhai inherits 5 acres of red Gujarat soil in Kamana village. He refuses chemical farming from day one — a revolutionary decision in 1972.',
    icon: '🌱',
    side: 'left',
    color: 'bg-sage/15 border-sage/30',
  },
  {
    year: '1985',
    title: 'First Gir Cows Arrive',
    desc: 'The farm welcomes its first Gir cows. Their A2 dung becomes the cornerstone of Kamana\'s Vedic composting system — replacing all chemical inputs.',
    icon: '🐄',
    side: 'right',
    color: 'bg-marigold/10 border-marigold/30',
  },
  {
    year: '1998',
    title: 'Water Conservation System',
    desc: 'After a harsh drought, Sureshbhai builds Gujarat\'s first on-farm rainwater harvesting system, creating the "Classic Watering" method still in use today.',
    icon: '💧',
    side: 'left',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    year: '2008',
    title: 'Net-House Innovation',
    desc: 'Son Het designs the first net-house structure — 12,000 sq ft of protected organic growing space. Zero pesticides. Maximum yield. Perfect microclimate.',
    icon: '🏗️',
    side: 'right',
    color: 'bg-forest/5 border-forest/20',
  },
  {
    year: '2011',
    title: 'PGS Organic Certification',
    desc: 'Kamana Farm receives PGS Organic India certification — formally recognising 40 years of chemical-free farming. The first in Kamana village.',
    icon: '🏅',
    side: 'left',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    year: '2019',
    title: 'Lab Testing Program',
    desc: 'Ansh R. introduces the independent NABL lab testing program. Every harvest batch tested for 80+ residues — published publicly as a transparency commitment.',
    icon: '🔬',
    side: 'right',
    color: 'bg-terracotta/10 border-terracotta/30',
  },
  {
    year: '2023',
    title: 'Pure Khetar Launches',
    desc: 'Three generations unite to launch Pure Khetar — bringing Kamana\'s morning harvest directly to families across Gujarat with guaranteed freshness.',
    icon: '🚀',
    side: 'left',
    color: 'bg-marigold/15 border-marigold/40',
  },
  {
    year: 'Today',
    title: 'Growing Forward',
    desc: 'Expanding net-house capacity to 25,000 sq ft. Introducing new varieties. Partnering with local farmers to spread Vedic organic practices across the region.',
    icon: '🌾',
    side: 'right',
    color: 'bg-forest/8 border-forest/25',
    active: true,
  },
];

/* ─── Milestone pillars ─────────────────────────────────────────────── */
const MILESTONES = [
  { icon: <Droplets className="w-5 h-5" />, stat: '60%', label: 'Less Water Used', sub: 'vs traditional methods' },
  { icon: <Award className="w-5 h-5" />, stat: '15+', label: 'Certifications', sub: 'over 50 years' },
  { icon: <TreePine className="w-5 h-5" />, stat: '5→15', label: 'Acres Cultivated', sub: 'organic growth' },
  { icon: <FlaskConical className="w-5 h-5" />, stat: '0ppm', label: 'Pesticide Residue', sub: 'in every test' },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function JourneyPage() {
  return (
<<<<<<< HEAD
    <div className="bg-cream overflow-x-hidden">
=======
    <main className="bg-cream overflow-x-hidden">
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[70vh] flex items-end overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/farm/classic-watering.jpeg"
            alt="Kamana farm heritage — classic watering"
            fill
            priority
            className="object-cover object-center opacity-50"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-forest via-forest/70 to-forest/30" />

        {/* Animated timeline path preview */}
        <div className="absolute right-0 top-0 bottom-0 w-40 hidden lg:block z-10 opacity-15">
          <svg viewBox="0 0 100 400" className="h-full w-full" preserveAspectRatio="none">
            <path d="M50 0 Q80 100 50 200 Q20 300 50 400" stroke="#E0A528" strokeWidth="2" fill="none" strokeDasharray="6,4" />
          </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl space-y-5"
          >
            <div className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
              <Leaf className="w-3.5 h-3.5" />
              50+ Years of Organic Legacy
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cream leading-tight">
              The Kamana<br />
              <span className="gradient-text italic">Journey</span>
            </h1>
            <p className="text-cream/80 text-base leading-relaxed">
              From five acres of red Gujarat soil in 1972 to a certified organic farm feeding 
              hundreds of families — this is the story of three generations and one unbreakable promise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ MILESTONES STRIP ══════════════════════════════════════════ */}
      <section className="bg-white border-y border-sage/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.07}>
                <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-cream transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-forest/8 flex items-center justify-center text-forest flex-shrink-0">
                    {m.icon}
                  </div>
                  <div>
                    <p className="font-serif text-xl font-bold text-forest">{m.stat}</p>
                    <p className="text-xs font-semibold text-gray-700">{m.label}</p>
                    <p className="text-[10px] text-gray-400">{m.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-3">
              <Sprout className="w-3.5 h-3.5" />
              Our Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              Roots That Run Deep
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto text-sm">
              Every milestone is a chapter in a story of stubbornness, love for the land, and an 
              unwavering belief that nature always knows best.
            </p>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sage/40 to-transparent hidden md:block" />

            <div className="space-y-8 md:space-y-12">
              {TIMELINE.map((item, i) => {
                const isLeft = item.side === 'left';
                return (
                  <Reveal key={item.year} delay={i * 0.06}>
                    <div className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                      {/* Content card */}
                      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                        <div className={`bg-white rounded-3xl p-6 border ${item.color} shadow-card card-hover ${item.active ? 'ring-2 ring-marigold/40' : ''}`}>
                          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                            <span className="text-2xl">{item.icon}</span>
                            <span className={`font-serif text-sm font-bold px-3 py-1 rounded-full ${item.active ? 'bg-marigold text-white' : 'bg-forest/8 text-forest'}`}>
                              {item.year}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-forest mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>

                      {/* Center dot */}
                      <div className="hidden md:flex w-10 flex-shrink-0 items-center justify-center mt-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className={`w-4 h-4 rounded-full border-2 border-white shadow-md ${item.active ? 'bg-marigold' : 'bg-sage'}`}
                        />
                      </div>

                      {/* Spacer */}
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WATER STORY IMAGE SECTION ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-organic-lg">
                <Image
                  src="/images/farm/classic-watering.jpeg"
                  alt="Classic water conservation at Kamana farm"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 glass-cream rounded-xl px-4 py-2.5 border border-sage/20">
                  <p className="text-xs font-bold text-forest">📍 Kamana, Gujarat</p>
                  <p className="text-[11px] text-gray-500">Our 1998 water conservation system</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-4">
                <Droplets className="w-3.5 h-3.5" />
                Water Stories
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-5 leading-tight">
                Saving Water,<br />
                <span className="text-terracotta">Season After Season</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                The 1998 drought changed everything. Rather than abandoning organic farming, 
                Sureshbhai built a 50,000-litre underground rainwater harvesting tank — fed by 
                rooftop channels and farm runoff. That system still waters our crops today.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Combined with precision drip irrigation, we&apos;ve reduced water consumption by 60% 
                while increasing soil moisture consistency — meaning healthier, more nutrient-dense 
                produce for you.
              </p>
              <Link
                href="/our-farm"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-terracotta transition-colors"
              >
                Explore our farm practices
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ═══════════════════════════════════════════════ */}
      <section className="py-16 bg-cream-dk">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-forest rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 3px 3px, #E0A528 1px, transparent 0)',
                  backgroundSize: '28px 28px',
                }}
              />
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4 relative z-10">
                Be Part of the Story
              </h2>
              <p className="text-cream/70 mb-8 relative z-10 max-w-xl mx-auto">
                Every crate you order directly supports Patel Sureshbhai&apos;s family and 
                keeps 50 years of organic farming heritage alive.
              </p>
              <div className="flex flex-wrap gap-3 justify-center relative z-10">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-marigold text-forest px-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold"
                >
                  <Sprout className="w-4 h-4" />
                  Shop Fresh Harvest
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 glass border border-white/30 text-cream px-7 py-4 rounded-full font-bold text-sm hover:bg-white/15 transition-colors"
                >
                  Meet the Team
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
<<<<<<< HEAD
    </div>
=======
    </main>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  );
}
