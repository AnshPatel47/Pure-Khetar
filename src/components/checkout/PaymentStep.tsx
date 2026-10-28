'use client';

import { ArrowLeft, Check, Leaf, ShieldCheck, Smartphone, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FormAlert } from '@/components/auth/FormAlert';
import { formatPrice, cn } from '@/lib/utils';
import { UpiPaymentPanel } from './UpiPaymentPanel';
import type { PaymentMethod } from '@/types/order';
import type { PaymentIntent } from '@/types/payment';

export type { PaymentIntent } from '@/types/payment';

interface PaymentStepProps {
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  total: number;
  placing: boolean;
  error?: string;
  onPlace: () => void;
  onBack: () => void;
  paymentIntent?: PaymentIntent;
  onPaymentCompleted?: () => void;
  onPaymentExpired?: () => void;
}

const OPTIONS = [
  { id: 'COD' as const, icon: Banknote, label: 'Cash on Delivery', sub: 'Pay in cash when your fresh produce arrives', recommended: true },
  { id: 'UPI' as const, icon: Smartphone, label: 'Online UPI Payment', sub: 'Pay securely via Google Pay or PhonePe' },
];

export function PaymentStep({ method, onMethodChange, total, placing, error, onPlace, onBack, paymentIntent, onPaymentCompleted, onPaymentExpired }: PaymentStepProps) {
  return (
    <div className="space-y-5">
      <fieldset disabled={placing || Boolean(paymentIntent)}>
        <legend className="mb-3 text-xs font-semibold text-forest/70">Choose payment method</legend>
        <div className="space-y-3">
          {OPTIONS.map(({ id, icon: Icon, label, sub, recommended }) => {
            const selected = method === id;
            return (
              <div key={id}>
                <label className="block cursor-pointer">
                  <input type="radio" name="payment" value={id} checked={selected} onChange={() => onMethodChange(id)} className="peer sr-only" />
                  <div className={cn('flex items-center gap-4 rounded-2xl border-2 p-4 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-marigold', selected ? 'border-forest bg-forest/5' : 'border-sage/15 bg-white hover:border-sage/40')}>
                    <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', selected ? 'bg-forest text-cream' : 'bg-sage/10 text-forest')}><Icon className="h-5 w-5" aria-hidden /></span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2"><p className="text-sm font-bold text-forest">{label}</p>{recommended && <span className="rounded-full bg-marigold/15 px-2 py-0.5 text-[10px] font-bold text-forest">Popular</span>}</div>
                      <p className="text-xs text-forest/50">{sub}</p>
                    </div>
                    <span className={cn('flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-forest bg-forest' : 'border-sage/30')}>{selected && <Check className="h-3 w-3 text-cream" aria-hidden />}</span>
                  </div>
                </label>

                {selected && id === 'COD' && (
                  <div className="mt-3 rounded-2xl border border-sage/15 bg-sage/5 p-4">
                    <div className="flex items-center gap-2 text-xs text-forest/70"><ShieldCheck className="h-4 w-4 shrink-0 text-sage" aria-hidden /><p>Pay the exact amount in <span className="font-semibold text-forest">cash</span> when your fresh produce arrives.</p></div>
                  </div>
                )}
                {selected && id === 'UPI' && paymentIntent && <UpiPaymentPanel intent={paymentIntent} onCompleted={onPaymentCompleted} onExpired={onPaymentExpired} />}
              </div>
            );
          })}
        </div>
      </fieldset>

      <FormAlert message={error} />
      {!paymentIntent && (
        <div className="flex gap-3">
          <Button variant="outline" size="lg" onClick={onBack} disabled={placing} leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden />}>Back</Button>
          <Button size="lg" className="flex-1" onClick={onPlace} loading={placing} rightIcon={<Leaf className="h-4 w-4" aria-hidden />}>{placing ? 'Placing order…' : `Place order · ${formatPrice(total)}`}</Button>
        </div>
      )}
    </div>
  );
}
