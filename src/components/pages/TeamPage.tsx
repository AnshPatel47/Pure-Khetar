'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Sprout, Leaf, Phone, Mail,
  Award, Heart, TreePine
} from 'lucide-react';

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
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Team Data ─────────────────────────────────────────────────────── */
const TEAM = [
  {
    id: 'sureshbhai',
    name: 'Patel Sureshbhai',
    role: 'Founder & Head Farmer',
    tagline: '"The soil is not just dirt — it is alive, it breathes, it remembers."',
    bio: 'With over 50 years of hands-on farming, Sureshbhai is the living encyclopedia of Kamana\'s organic practices. He began refusing chemical inputs in 1972 — before "organic" was even a word in Gujarat. Today, his Vedic composting methods and deep knowledge of crop cycles are the backbone of Pure Khetar\'s quality.',
    since: '1972',
    role_detail: 'Soil Science & Vedic Farming',
    specialties: ['Vedic Composting', 'Crop Rotation', 'Gir Cow Management', 'Soil Biology'],
    image: null, // no photo available yet
    accent: 'from-forest to-forest-l',
    iconBg: 'bg-forest/10',
    badgeColor: 'bg-marigold text-forest',
  },
  {
    id: 'het',
    name: 'Het Patel',
    role: 'Farm Operations & Innovation',
    tagline: '"Technology should amplify nature, never replace it."',
    bio: 'Het brings modern agricultural science to the farm\'s ancient roots. He designed the 12,000 sq ft net-house structure in 2008 and introduced precision drip irrigation — cutting water use by 60%. His background in agricultural engineering has transformed Kamana from a local farm into a model of sustainable scalability.',
    since: '2008',
    role_detail: 'Agricultural Engineering & Operations',
    specialties: ['Net-House Design', 'Drip Irrigation', 'Water Harvesting', 'Precision Agriculture'],
    image: null,
    accent: 'from-sage to-forest',
    iconBg: 'bg-sage/10',
    badgeColor: 'bg-sage/20 text-forest',
  },
  {
    id: 'ansh',
    name: 'Ansh R.',
    role: 'Brand, Tech & Transparency',
    tagline: '"Every farmer deserves fair prices. Every consumer deserves honest food."',
    bio: 'Ansh built Pure Khetar from the ground up — the brand, the website, the lab testing program, and the direct-to-consumer supply chain. His vision: eliminate middlemen, maximize freshness, and give Kamana\'s farmers the recognition and income they deserve. He handles everything from packaging design to customer WhatsApp.',
    since: '2023',
    role_detail: 'Brand Design & Customer Experience',
    specialties: ['Brand Strategy', 'Lab Testing Program', 'Direct-to-Consumer', 'Technology'],
    image: null,
    accent: 'from-terracotta to-marigold',
    iconBg: 'bg-terracotta/10',
    badgeColor: 'bg-terracotta/15 text-terracotta',
  },
];

/* ─── Values ────────────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: <Leaf className="w-5 h-5" />,
    title: 'Zero Compromise',
    desc: 'Not a single chemical has touched Kamana soil in 50+ years. That commitment is non-negotiable.',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Full Transparency',
    desc: 'Every lab report is public. Every practice is documented. We have nothing to hide — and everything to share.',
    color: 'bg-marigold/10 text-marigold',
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: 'Family First',
    desc: 'Pure Khetar is a family farm, not a corporation. When you buy from us, you support three generations directly.',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: <TreePine className="w-5 h-5" />,
    title: 'Living Soil Promise',
    desc: 'We leave every acre richer than we found it — for the next generation of Patels and for the planet.',
    color: 'bg-forest/8 text-forest',
  },
];

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function TeamPage() {
  return (
    <main className="bg-cream overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════ */}
      <section className="relative bg-forest overflow-hidden">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #E0A528 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Leaf decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-80 h-80 opacity-5"
        >
          <Leaf className="w-full h-full text-marigold" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="inline-flex items-center gap-2 glass border border-white/20 text-marigold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sprout className="w-3.5 h-3.5" />
              The Faces Behind the Farm
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cream leading-tight mb-5">
              Three Generations,<br />
              <span className="gradient-text italic">One Mission</span>
            </h1>
            <p className="text-cream/75 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Pure Khetar isn&apos;t a faceless brand. It&apos;s Sureshbhai&apos;s lifetime of farming wisdom, 
              Het&apos;s engineering innovation, and Ansh&apos;s mission to bring it all to your table.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ TEAM CARDS ═══════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {TEAM.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.08}>
                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                  {/* ── Photo / Avatar Card ── */}
                  <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="relative">
                      {/* Glassmorphism card */}
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.35 }}
                        className="relative bg-white rounded-4xl overflow-hidden shadow-organic-lg border border-sage/10"
                      >
                        {/* Avatar placeholder with gradient */}
                        <div className={`aspect-[4/3] bg-gradient-to-br ${member.accent} flex items-center justify-center relative`}>
                          {/* Grid texture */}
                          <div className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                              backgroundSize: '20px 20px',
                            }}
                          />
                          {/* Large initials */}
                          <span className="font-serif text-8xl font-bold text-white/30 select-none relative z-10">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                          {/* Year badge */}
                          <div className="absolute top-4 left-4 glass border border-white/25 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                            Since {member.since}
                          </div>
                          {/* Leaf decor */}
                          <Leaf className="absolute bottom-4 right-4 w-12 h-12 text-white/20" />
                        </div>

                        {/* Bottom caption */}
                        <div className="p-5">
                          <p className="font-serif text-lg font-bold text-forest">{member.name}</p>
                          <p className="text-xs text-sage font-medium mt-0.5">{member.role}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {member.specialties.map((s) => (
                              <span
                                key={s}
                                className="text-[10px] bg-cream border border-sage/20 text-forest/70 px-2 py-0.5 rounded-full font-medium"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating role badge */}
                      <div className={`absolute -top-3 -right-3 ${member.badgeColor} px-3 py-1.5 rounded-full text-[11px] font-bold shadow-card border border-white`}>
                        {member.role_detail}
                      </div>
                    </div>
                  </div>

                  {/* ── Bio Content ── */}
                  <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <blockquote className="font-serif text-lg italic text-forest/70 mb-6 border-l-4 border-marigold pl-5 leading-relaxed">
                      {member.tagline}
                    </blockquote>
                    <h2 className="font-serif text-3xl font-bold text-forest mb-2">{member.name}</h2>
                    <p className="text-sm font-semibold text-terracotta uppercase tracking-wide mb-5">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base">
                      {member.bio}
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#128C4A] bg-[#25D366]/10 border border-[#25D366]/30 px-4 py-2.5 rounded-full hover:bg-[#25D366]/20 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                      <a
                        href="mailto:hello@purekhetar.com"
                        className="flex items-center gap-1.5 text-xs font-semibold text-forest/70 bg-forest/5 border border-forest/15 px-4 py-2.5 rounded-full hover:bg-forest/10 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email Us
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUES ════════════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-3">
              <Leaf className="w-3.5 h-3.5" />
              What We Stand For
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Our Core Values</h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="bg-cream rounded-3xl p-6 border border-sage/10 card-hover h-full">
                  <div className={`w-11 h-11 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-base font-bold text-forest mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ JOIN CTA ══════════════════════════════════════════════════ */}
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
                Grow With Us
              </h2>
              <p className="text-cream/70 mb-8 relative z-10 max-w-lg mx-auto">
                Questions about our practices? Want to visit the farm? 
                We love meeting the families we feed — reach out anytime.
              </p>
              <div className="flex flex-wrap gap-3 justify-center relative z-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-marigold text-forest px-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold"
                >
                  <Mail className="w-4 h-4" />
                  Contact the Team
                </Link>
                <Link
                  href="/our-farm"
                  className="inline-flex items-center gap-2 glass border border-white/30 text-cream px-7 py-4 rounded-full font-bold text-sm hover:bg-white/15 transition-colors"
                >
                  Visit Our Farm
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
