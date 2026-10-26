'use client';

import { motion } from 'framer-motion';
import { Check, MessageCircle, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

export function OrderSuccess({ orderId, total }: { orderId: string; total: number }) {
  const reference = orderId.slice(-8).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg space-y-5 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest shadow-organic-lg"
      >
        <Check className="h-10 w-10 text-cream" aria-hidden />
      </motion.div>

      <div>
        <h1 className="font-serif text-3xl font-bold text-forest">Order placed 🌾</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-forest/65">
          Thank you! We have received your order and will confirm your delivery on WhatsApp.
        </p>
      </div>

      <div className="inline-block rounded-2xl border border-marigold/25 bg-marigold/10 px-6 py-3">
        <p className="text-sm font-bold text-forest">Order #{reference}</p>
        <p className="text-xs text-forest/60">Amount to pay on delivery: {formatPrice(total)}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button href="/account" leftIcon={<Sprout className="h-4 w-4" aria-hidden />}>
          View my orders
        </Button>
        <Button
          href={whatsappLink(`Hello ${SITE.name}! I just placed order #${reference}.`)}
          variant="whatsapp"
          leftIcon={<MessageCircle className="h-4 w-4" aria-hidden />}
        >
          Message us
        </Button>
      </div>
    </motion.div>
  );
}
