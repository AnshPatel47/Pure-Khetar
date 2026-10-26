'use client';

import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  icon: ReactNode;
  error?: string;
  rightElement?: ReactNode;
}

/**
 * Input with a floating label. The float is driven by CSS (`peer-placeholder-shown`),
 * so it also works with browser autofill and needs no React state.
 */
export function FloatingInput({ label, icon, error, rightElement, className, id, ...props }: FloatingInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <div
        className={cn(
          'relative flex items-center rounded-2xl border-2 bg-cream transition-colors duration-200 focus-within:border-forest focus-within:shadow-sm',
          error ? 'border-red-300' : 'border-sage/25 hover:border-sage/50',
        )}
      >
        <span className="pointer-events-none flex-shrink-0 pl-4 text-forest/40 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>

        <div className="relative flex-1 px-3 pb-2 pt-5">
          <input
            {...props}
            id={inputId}
            placeholder=" "
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className={cn('peer w-full bg-transparent text-sm font-medium text-forest outline-none', className)}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-3 top-2 text-[10px] font-bold text-forest/70 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:text-forest/45 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-forest/70"
          >
            {label}
          </label>
        </div>

        {rightElement && <div className="flex-shrink-0 pr-3">{rightElement}</div>}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 px-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** FloatingInput with a show / hide password button. */
export function PasswordInput(props: Omit<FloatingInputProps, 'type' | 'rightElement'>) {
  const [visible, setVisible] = useState(false);

  return (
    <FloatingInput
      {...props}
      type={visible ? 'text' : 'password'}
      rightElement={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="rounded-lg p-1.5 text-forest/40 transition-colors hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}
