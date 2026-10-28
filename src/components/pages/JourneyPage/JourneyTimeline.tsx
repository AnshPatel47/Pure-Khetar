'use client';

import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { TIMELINE } from './data';

export function JourneyTimeline() {
  return (
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
  );
}
