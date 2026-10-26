'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
<<<<<<< HEAD
import { motion, useScroll, useTransform } from 'framer-motion';
=======
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
import {
  Sprout, ShieldCheck, Droplets, Sun, Wind, Award,
  Leaf, ArrowRight, PlayCircle, FlaskConical, TreePine
} from 'lucide-react';
<<<<<<< HEAD
import { Reveal } from '@/components/ui/Reveal';
import { FarmGallery } from '@/components/home/FarmGallery';

=======

/* ─── Reveal wrapper ────────────────────────────────────────────────── */
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
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb

/* ─── Section Heading ────────────────────────────────────────────────── */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-3">
        <Sprout className="w-3.5 h-3.5" />
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ─── Feature Grid ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Wind className="w-5 h-5" />,
    title: 'Net-House Microclimate',
    desc: 'Our 12,000 sq ft net-houses create the ideal controlled environment — protecting crops from harsh Gujarat sun and pests without any chemicals.',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: 'Drip Water Conservation',
    desc: 'Using precision drip irrigation, we conserve 60% more water than traditional flood irrigation, while delivering nutrients directly to roots.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'Vedic A2 Manure',
    desc: 'Gir Cow A2 dung compost enriches our soil with natural probiotics, replacing synthetic fertilizers entirely — a 50-year tradition.',
    color: 'bg-marigold/10 text-marigold',
  },
  {
    icon: <TreePine className="w-5 h-5" />,
    title: 'Biodiversity Preservation',
    desc: 'We intercrop with local herbs and maintain pollinator gardens, naturally deterring pests while building rich, living soil ecosystems.',
    color: 'bg-forest/8 text-forest',
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: 'Independent Lab Testing',
    desc: 'Every batch is tested at NABL-accredited labs for 80+ pesticide residues. Reports are publicly available — zero secrets, zero shortcuts.',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'PGS Organic Certified',
    desc: 'Certified under India\'s Participatory Guarantee System — the gold standard in grassroots organic certification since 2011.',
    color: 'bg-emerald-50 text-emerald-600',
  },
];

/* ─── Certification Badges ─────────────────────────────────────────── */
const CERTS = [
  { label: 'PGS Organic India', year: '2011–Present' },
  { label: 'NABL Lab Tested', year: 'Every Harvest' },
  { label: 'Zero Pesticide', year: 'Batch Verified' },
  { label: 'A2 Vedic Certified', year: 'Gir Cow Manure' },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function OurFarmPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
<<<<<<< HEAD
    <div className="bg-cream overflow-x-hidden">
=======
    <main className="bg-cream overflow-x-hidden">
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[75vh] flex items-end overflow-hidden bg-forest"
      >
        {/* BG Image */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-110">
          <Image
            src="/images/farm/nethouse-farming.jpeg"
            alt="Kamana Net-House Organic Farm Gujarat"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-forest/95 via-forest/50 to-forest/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-forest/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="max-w-2xl space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              <Leaf className="w-3.5 h-3.5" />
              Kamana Village · Gujarat, India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl font-bold text-cream leading-tight"
            >
              Where Every Seed<br />
              <span className="gradient-text italic">Tells a Story</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-cream/80 text-base sm:text-lg leading-relaxed"
            >
              Since 1972, Patel Sureshbhai&apos;s family has cultivated Kamana&apos;s red soil 
              using only Vedic practices. No shortcuts. No chemicals. Just pure intention and 
              generations of wisdom.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ══ INTRO SPLIT ════════════════════════════════════════════════ */}
      <section id="nethouse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Net-House Farming"
              title={<>Controlled Purity,<br /><span className="text-terracotta">Open Skies</span></>}
              subtitle="Our patented net-house structure covers 12,000 sq ft, creating a micro-environment that eliminates the need for pesticides while letting natural sunlight and Gujarat's breeze do their work."
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { num: '12,000', unit: 'sq ft', label: 'Net-House Coverage' },
                { num: '0', unit: 'pesticides', label: 'Used in Farming' },
                { num: '60%', unit: 'less water', label: 'vs Flood Irrigation' },
                { num: '365', unit: 'days', label: 'Active Cultivation' },
              ].map(({ num, unit, label }) => (
                <div key={label} className="bg-white rounded-2xl p-4 border border-sage/15 shadow-card">
                  <p className="font-serif text-2xl font-bold text-forest">
                    {num} <span className="text-sm font-normal text-sage">{unit}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-organic-lg">
                <Image
                  src="/images/farm/nethouse-farming.jpeg"
                  alt="Net-house farming at Kamana farm"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
              </div>
              {/* Floating label */}
              <div className="absolute -bottom-5 -right-5 glass-cream rounded-2xl p-4 shadow-card flex items-center gap-3 border border-sage/20">
                <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Certified Since</p>
                  <p className="text-sm font-bold text-forest">2011 PGS Organic</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FEATURE GRID ═══════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionHeading
              eyebrow="Our Practices"
              title={<>What Makes Kamana<br /><span className="text-terracotta">Truly Organic</span></>}
              center
            />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="group bg-cream rounded-3xl p-6 border border-sage/10 card-hover h-full">
                  <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
                    {f.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-2 group-hover:text-terracotta transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VIDEO SECTION (Dairy) ═══════════════════════════════════════ */}
      <section id="dairy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal delay={0.1}>
            {/* Video player card */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-forest shadow-organic-lg group cursor-pointer">
              <video
                src="/videos/organic-derry-farm.mp4"
                className="w-full h-full object-cover"
                playsInline
                loop
                muted
                autoPlay
              />
              <div className="absolute inset-0 bg-forest/30 group-hover:bg-forest/10 transition-colors flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-glow-gold"
                >
                  <PlayCircle className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              <div className="absolute bottom-4 left-4 glass border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                🐄 Gir Cow A2 Dairy — Kamana Farm
              </div>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Gir Cow A2 Dairy"
              title={<>The Secret in<br /><span className="text-terracotta">Our Soil</span></>}
              subtitle="Our resident Gir cows are the heart of the farm. Their A2 dung compost, aged for 6 months, creates a living soil brimming with beneficial microbes that no synthetic fertilizer can replicate."
            />
            <div className="mt-8 space-y-4">
              {[
                'Pure A2 Vedic compost — no synthetic fertilizers ever',
                '6-month maturation process for maximum nutrient density',
                'Natural pest repellent through healthy soil biology',
                'Carbon sequestration — net positive environmental impact',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-marigold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-3 h-3 text-marigold" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CLASSIC WATERING SPLIT ════════════════════════════════════ */}
      <section className="bg-forest py-20 lg:py-28 relative overflow-hidden">
        {/* bg pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-marigold text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Droplets className="w-3.5 h-3.5" />
                Water Conservation
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
                Ancient Wisdom,<br />
                <span className="text-marigold italic">Modern Precision</span>
              </h2>
              <p className="text-cream/75 text-base leading-relaxed mb-8">
                We combine traditional water harvesting techniques with modern drip-irrigation 
                to conserve Gujarat&apos;s most precious resource — water. Our closed-loop system 
                recycles runoff back to our compost pits.
              </p>
              <Link
                href="/journey"
                className="group inline-flex items-center gap-2 bg-marigold text-forest px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold"
              >
                See Our Water Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/farm/classic-watering.jpeg"
                  alt="Traditional water conservation at Kamana farm"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ LAB CERTIFICATIONS ════════════════════════════════════════ */}
      <section id="lab-reports" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionHeading
              eyebrow="Transparency & Trust"
              title={<>Every Claim,<br /><span className="text-terracotta">Lab Verified</span></>}
              subtitle="We believe transparency is non-negotiable. Every batch of produce is sent to NABL-accredited labs before it reaches your kitchen."
              center
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CERTS.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <div className="bg-white rounded-3xl p-6 border border-sage/15 shadow-card text-center card-hover group">
                  <div className="w-14 h-14 bg-forest/8 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-forest group-hover:text-cream transition-colors">
                    <Award className="w-7 h-7 text-forest group-hover:text-cream transition-colors" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-forest">{c.label}</h3>
                  <p className="text-xs text-sage font-medium mt-1">{c.year}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-forest/30 text-forest px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-forest hover:text-cream transition-all duration-300"
              >
                Request Full Lab Reports
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════ */}
      <section className="bg-cream-dk py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-forest rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: 'radial-gradient(circle at 3px 3px, #E0A528 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
              <p className="text-marigold text-xs font-bold uppercase tracking-widest mb-3 relative z-10">
                🌾 Taste the Difference
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4 relative z-10">
                From Our Soil to Your Table
              </h2>
              <p className="text-cream/70 mb-8 relative z-10 max-w-xl mx-auto">
                Order your first organic crate and experience what 50 years of chemical-free farming tastes like.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-marigold text-forest px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold relative z-10"
              >
                <Sprout className="w-4 h-4" />
                Shop Fresh Harvest
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
<<<<<<< HEAD

      {/* ══ FULL FARM GALLERY ══════════════════════════════════════════════ */}
      <FarmGallery />

    </div>
=======
    </main>
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  );
}
