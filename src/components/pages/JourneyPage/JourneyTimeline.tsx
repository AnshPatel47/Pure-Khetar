'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Sprout } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const PROCESS_STEPS = [
  { number: '01', title: 'Ready the Farm', gujarati: 'ખેતર તૈયાર', description: 'Prepare healthy soil, clean beds, water lines, and protected net-house rows.', image: '/images/farm/nethouse-farming.jpeg' },
  { number: '02', title: 'Sow the Seeds', gujarati: 'બિયારણ વાવવું', description: 'Selected seeds are sown carefully and nurtured from the first day.', image: '/images/farm/plant.jpeg' },
  { number: '03', title: 'Watch It Grow', gujarati: 'ઉગવણી અને કાળજી', description: 'Plants grow with steady water, natural manure, and daily hands-on farm care.', image: '/images/farm/baby-eggplant.jpeg' },
  { number: '04', title: 'Morning Harvest', gujarati: 'સવારનું પાક', description: 'Fresh produce is picked at sunrise, checked, and delivered without delay.', image: '/images/products/ringan.jpeg' },
];

export function JourneyTimeline() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-terracotta">
            <Sprout className="h-3.5 w-3.5" /> Live farm process
          </p>
          <h2 className="font-serif text-3xl font-bold text-forest sm:text-4xl">From Soil to Sunrise</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-600">Follow one crop through every important stage — from the first prepared bed to the morning harvest.</p>
        </Reveal>

        <div className="relative">
          <div className="absolute bottom-10 left-[31px] top-10 hidden w-px bg-sage/20 md:block md:left-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-marigold via-sage to-forest"
            />
          </div>

          <div className="space-y-6 md:space-y-10">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.12}>
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className={`relative grid items-center gap-6 rounded-2xl border border-sage/15 bg-white p-4 shadow-card md:grid-cols-2 md:p-5 ${index % 2 ? 'md:[direction:rtl]' : ''}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-sage/10 md:[direction:ltr]">
                    <Image src={step.image} alt={step.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
                    <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-bold text-forest shadow-sm">{step.number}</span>
                  </div>
                  <div className="px-2 py-2 md:[direction:ltr]">
                    <p className="text-xs font-bold uppercase tracking-widest text-sage">{step.gujarati}</p>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-forest">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{step.description}</p>
                  </div>
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute -bottom-10 left-[31px] z-10 hidden md:block md:left-1/2 md:-translate-x-1/2">
                      <ArrowDown className="h-5 w-5 text-marigold" />
                    </div>
                  )}
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
