'use client';

import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';
import { COMMERCE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import type { CartTotals } from '@/types/cart';

export function FreeDeliveryProgress({ totals }: { totals: CartTotals }) {
  const percent = Math.min(100, (totals.subtotal / COMMERCE.freeDeliveryThreshold) * 100);

  return (
    <div className="space-y-2 rounded-2xl bg-forest/5 p-3.5">
      <p className="flex items-center gap-2 text-xs font-semibold text-forest">
        <Truck className="h-4 w-4 shrink-0" aria-hidden />
        {totals.qualifiesForFreeDelivery
          ? 'You get free delivery on this order!'
          : `Add ${formatPrice(totals.freeDeliveryRemaining)} more for free delivery`}
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-sage/20" role="progressbar" aria-valuenow={Math.round(percent)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to free delivery">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sage to-marigold"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
