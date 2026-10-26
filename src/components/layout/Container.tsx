import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef, ElementType } from 'react';

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

/** Standard page-width wrapper so every section lines up. */
export function Container<T extends ElementType = 'div'>({ as, className, ...props }: ContainerProps<T>) {
  const Tag: ElementType = as ?? 'div';
  return <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />;
}
