'use client';

import { ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { Field, inputClass } from './Field';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { DELIVERY_SLOTS_INFO } from '@/data/checkout';
import { todayInIndia } from '@/lib/validations/checkout.schema';
import { cn } from '@/lib/utils';

interface SlotStepProps {
  slot: string;
  date: string;
  onSlotChange: (slot: string) => void;
  onDateChange: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function SlotStep({ slot, date, onSlotChange, onDateChange, onNext, onBack }: SlotStepProps) {
  return (
    <div className="space-y-5">
      <Field label="Delivery date *">
        <input
          type="date"
          className={inputClass}
          value={date}
          min={todayInIndia(1)}
          max={todayInIndia(14)}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </Field>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold text-forest/70">Preferred time window</legend>
        <div className="space-y-3">
          {DELIVERY_SLOTS_INFO.map((option) => {
            const selected = slot === option.id;
            return (
              <label key={option.id} className="block cursor-pointer">
                <input
                  type="radio"
                  name="slot"
                  value={option.id}
                  checked={selected}
                  onChange={() => onSlotChange(option.id)}
                  className="peer sr-only"
                />
                <div
                  className={cn(
                    'flex items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-marigold',
                    selected ? 'border-forest bg-forest/5 shadow-natural' : 'border-sage/15 bg-white hover:border-sage/40',
                  )}
                >
                  <span className="text-2xl" aria-hidden>{option.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-forest">{option.label}</p>
                      {option.recommended && <Badge variant="natural">Recommended</Badge>}
                    </div>
                    <p className="text-xs font-semibold text-sage">{option.time}</p>
                    <p className="mt-0.5 text-[11px] text-forest/50">{option.desc}</p>
                  </div>
                  <span
                    className={cn(
                      'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                      selected ? 'border-forest bg-forest' : 'border-sage/30',
                    )}
                  >
                    {selected && <Check className="h-3 w-3 text-cream" aria-hidden />}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" onClick={onBack} leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden />}>
          Back
        </Button>
        <Button size="lg" className="flex-1" onClick={onNext} disabled={!date} rightIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>
          Continue to payment
        </Button>
      </div>
    </div>
  );
}
