import { useId, type ReactElement, cloneElement } from 'react';
import { cn } from '@/lib/utils';

export const inputClass =
  'w-full rounded-2xl border border-sage/20 bg-cream px-4 py-3.5 text-sm text-forest outline-none transition-all placeholder:text-forest/35 focus:border-forest/50 focus:ring-2 focus:ring-forest/10 aria-[invalid=true]:border-red-300';

interface FieldProps {
  label: string;
  error?: string;
  children: ReactElement;
  className?: string;
}

/** Label + control + error message, wired together for screen readers. */
export function Field({ label, error, children, className }: FieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-forest/70">
        {label}
      </label>
      {cloneElement(children, {
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `${id}-error` : undefined,
      })}
      {error && (
        <p id={`${id}-error`} role="alert" className={cn('mt-1.5 text-xs font-medium text-red-600')}>
          {error}
        </p>
      )}
    </div>
  );
}
