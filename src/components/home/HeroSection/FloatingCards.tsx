'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Leaf } from 'lucide-react';

/* ─── Stagger helper ────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface FloatingCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
  delay?: number;
}

export function FloatingCard({ icon, label, value, className, delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'backOut' }}
      className={`glass-cream rounded-2xl p-3.5 shadow-card flex items-center gap-3 ${className ?? ''}`}
    >
      <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center text-forest flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm font-bold text-forest leading-tight">{value}</p>
      </div>
    </motion.div>
  );
}

export { fadeUp };

/* ─── Right-side floating cards column ─────────────────────────────── */
export function HeroFloatingCards() {
  return (
    <div className="hidden xl:block absolute right-12 top-1/2 -translate-y-1/2 z-20 space-y-4">
      <FloatingCard
        icon={<ShieldCheck className="w-5 h-5" />}
        label="Verified Quality"
        value="100% Lab Tested Pure"
        delay={0.5}
        className="animate-float"
      />
      <FloatingCard
        icon={<Truck className="w-5 h-5" />}
        label="Delivery"
        value="Within 6–12 hrs of Harvest"
        delay={0.65}
        className="animate-float-slow"
      />
      <FloatingCard
        icon={<Leaf className="w-5 h-5" />}
        label="Method"
        value="Net-House Natural Farming"
        delay={0.8}
      />
    </div>
  );
}
