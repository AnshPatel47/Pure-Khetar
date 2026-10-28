'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface CartOrderNoteProps {
  note: string;
  onChange: (note: string) => void;
}

export function CartOrderNote({ note, onChange }: CartOrderNoteProps) {
  const [showNote, setShowNote] = useState(false);

  return (
    <div className="rounded-3xl border border-sage/10 bg-white p-6 shadow-card">
      <button
        type="button"
        onClick={() => setShowNote((open) => !open)}
        aria-expanded={showNote}
        className="flex w-full items-center gap-2 text-left text-sm font-semibold text-forest transition-colors hover:text-terracotta"
      >
        <MessageSquare className="h-4 w-4" aria-hidden />
        {showNote ? 'Hide' : 'Add'} order note
        <span className="text-xs font-normal text-forest/45">(special instructions)</span>
      </button>
      <AnimatePresence initial={false}>
        {showNote && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <label htmlFor="order-note" className="sr-only">Order note</label>
            <textarea
              id="order-note"
              value={note}
              onChange={(event) => onChange(event.target.value)}
              maxLength={200}
              rows={3}
              placeholder="E.g. Please pack vegetables separately."
              className="mt-4 w-full resize-none rounded-2xl border border-sage/20 bg-cream p-4 text-sm text-forest outline-none transition-colors placeholder:text-forest/35 focus:border-forest/40"
            />
            <p className="mt-1.5 text-xs text-forest/45">{note.length}/200 characters</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
