'use client';

import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 py-24 text-center"
    >
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-forest/5 text-5xl" aria-hidden>
        🧺
      </div>
      <div>
        <h2 className="font-serif text-2xl font-bold text-forest">Your crate is empty</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-forest/55">
          Add fresh vegetables straight from our Kamana farm.
        </p>
      </div>
      <Button href="/shop" size="lg" leftIcon={<Sprout className="h-4 w-4" aria-hidden />}>
        Explore fresh harvest
      </Button>
    </motion.div>
  );
}
