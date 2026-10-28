import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const VARIANTS = {
  natural: 'bg-marigold text-forest',
  forest: 'bg-forest text-cream',
  soft: 'bg-sage/15 text-forest',
  accent: 'bg-terracotta text-white',
  danger: 'bg-red-50 text-red-700 ring-1 ring-red-200',
} as const;

interface BadgeProps {
  variant?: keyof typeof VARIANTS;
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = 'soft', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold leading-none',
        VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
