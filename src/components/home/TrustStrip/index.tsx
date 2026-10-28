'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Truck, Sprout, Clock, Award, Leaf } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: <Sprout className="w-4 h-4" />, text: '0% Chemicals', sub: 'Lab Verified' },
  { icon: <Truck className="w-4 h-4" />, text: 'Morning Delivery', sub: 'Before 9 AM' },
  { icon: <ShieldCheck className="w-4 h-4" />, text: 'Freshness Guarantee', sub: 'Or Full Refund' },
  { icon: <Award className="w-4 h-4" />, text: 'PGS Certified', sub: 'Since 2011' },
  { icon: <Clock className="w-4 h-4" />, text: '12h Harvest→Door', sub: 'Same Day' },
  { icon: <Leaf className="w-4 h-4" />, text: 'A2 Vedic Manure', sub: 'Gir Cow Nourished' },
];

export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-white border-y border-sage/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex items-center gap-2.5 px-3 py-3 rounded-xl hover:bg-cream transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-forest/8 flex items-center justify-center text-forest flex-shrink-0 group-hover:bg-forest group-hover:text-cream transition-colors">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-forest leading-none">{item.text}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
