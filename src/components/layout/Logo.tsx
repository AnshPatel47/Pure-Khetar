import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  /** `light` is for use on dark photos. */
  tone?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
  /** Size variant: 'sm' for compact navbar, 'md' for default */
  size?: 'sm' | 'md';
}

export function Logo({ tone = 'dark', showTagline = false, className, size = 'md' }: LogoProps) {
  const light = tone === 'light';
  const logoSize = size === 'sm' ? 36 : 44;

  return (
    <Link href="/" aria-label="Pure Khetar — home" className={cn('group flex shrink-0 items-center gap-2.5', className)}>
      {/* Real brand logo mark */}
      <span
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full transition-all duration-500 group-hover:scale-105 group-hover:shadow-glow-green',
          light ? 'ring-2 ring-white/30' : 'ring-2 ring-forest/10',
        )}
        style={{ width: logoSize, height: logoSize }}
      >
        <Image
          src="/icons/brand/Logo.jpeg"
          alt="Pure Khetar logo"
          fill
          sizes="48px"
          className="object-cover object-center"
          priority
        />
      </span>

      <span className="leading-none">
        <span
          className={cn(
            'block font-serif font-bold tracking-tight transition-colors',
            size === 'sm' ? 'text-lg' : 'text-xl',
            light ? 'text-cream' : 'text-forest',
          )}
        >
          Pure{' '}
          <span className={light ? 'text-marigold' : 'text-terracotta'}>Khetar</span>
        </span>
        {showTagline && (
          <span
            className={cn(
              'mt-0.5 hidden text-[10px] font-medium tracking-wide sm:block',
              light ? 'text-cream/70' : 'text-sage',
            )}
          >
            Kamana Farm · Gujarat
          </span>
        )}
      </span>
    </Link>
  );
}
