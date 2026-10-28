'use client';

import { motion } from 'framer-motion';
import { Leaf, PlayCircle } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const DAIRY_POINTS = [
  'Pure A2 Vedic compost — no synthetic fertilizers ever',
  '6-month maturation process for maximum nutrient density',
  'Natural pest repellent through healthy soil biology',
  'Carbon sequestration — net positive environmental impact',
];

export function DairyVideoSection() {
  return (
    <section id="dairy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <Reveal delay={0.1}>
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-forest shadow-organic-lg group cursor-pointer">
            <video
              src="/videos/natural-derry-farm.mp4"
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
              🐄 Cow Dairy — Kamana Farm
            </div>
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading
            eyebrow="Cow Dairy"
            title={<>The Secret in<br /><span className="text-terracotta">Our Soil</span></>}
            subtitle="Our resident cows are the heart of the farm. Their A2 dung compost, aged for 6 months, creates a living soil brimming with beneficial microbes that no synthetic fertilizer can replicate."
          />
          <div className="mt-8 space-y-4">
            {DAIRY_POINTS.map((point) => (
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
  );
}
