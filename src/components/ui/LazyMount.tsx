'use client';

import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface LazyMountProps {
  children: ReactNode;
  /** Shown until the section is close to the viewport. Keep it the same height to avoid layout shift. */
  placeholder?: ReactNode;
  /** How early to start loading, before the section scrolls into view. */
  rootMargin?: string;
  className?: string;
}

/** Renders `children` only once the area is about to scroll into view. */
export function LazyMount({ children, placeholder = null, rootMargin = '400px', className }: LazyMountProps) {
  const [ref, inView] = useInView({ rootMargin, once: true });

  return (
    <div ref={ref} className={cn(className)}>
      {inView ? children : placeholder}
    </div>
  );
}
