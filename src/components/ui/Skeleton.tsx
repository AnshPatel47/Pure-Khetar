import { cn } from '@/lib/utils';

/** Placeholder block shown while content streams in. */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse rounded-xl bg-sage/15', className)} />;
}
