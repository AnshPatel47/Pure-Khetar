import { Fragment } from 'react';
import { Check, Clock, CreditCard, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CheckoutStep = 'address' | 'slot' | 'payment';

const STEPS = [
  { id: 'address', label: 'Delivery', icon: MapPin },
  { id: 'slot', label: 'Time slot', icon: Clock },
  { id: 'payment', label: 'Payment', icon: CreditCard },
] as const;

export function CheckoutStepBar({ current }: { current: CheckoutStep }) {
  const currentIndex = STEPS.findIndex((step) => step.id === current);

  return (
    <ol className="flex items-center" aria-label="Checkout progress">
      {STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        const Icon = step.icon;

        return (
          <Fragment key={step.id}>
            <li className="flex flex-col items-center gap-1.5" aria-current={active ? 'step' : undefined}>
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300',
                  done && 'bg-forest text-cream',
                  active && 'bg-marigold text-forest shadow-glow-gold',
                  !done && !active && 'bg-sage/15 text-sage',
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
              </span>
              <span className={cn('text-[11px] font-semibold', active ? 'text-forest' : 'text-forest/45')}>
                {step.label}
              </span>
            </li>
            {index < STEPS.length - 1 && (
              <li aria-hidden className={cn('mx-2 mb-5 h-0.5 flex-1 transition-colors duration-300', done ? 'bg-forest' : 'bg-sage/20')} />
            )}
          </Fragment>
        );
      })}
    </ol>
  );
}
