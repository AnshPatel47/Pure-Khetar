import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeading({
  title,
  description,
  eyebrow,
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'items-center text-center sm:flex-col sm:items-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl space-y-3', align === 'center' && 'mx-auto')}>
        {eyebrow && <p className="text-sm font-semibold text-terracotta">{eyebrow}</p>}
        <h2 className="font-serif text-3xl font-bold leading-tight text-forest text-balance sm:text-4xl">{title}</h2>
        {description && <p className="text-base leading-relaxed text-forest/70">{description}</p>}
      </div>

      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-forest transition-colors hover:text-terracotta"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
