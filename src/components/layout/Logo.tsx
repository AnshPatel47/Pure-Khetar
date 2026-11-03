import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Size variant: 'sm' for compact navbar, 'md' for default */
  size?: 'sm' | 'md';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const logoSize = size === 'sm' ? 52 : 64;

  return (
    <Link href="/" aria-label="Pure Khetar — home" className={cn('group flex shrink-0 items-center', className)}>
      <span
        className="relative flex shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ width: logoSize, height: logoSize }}
      >
        <Image
          src="/icons/brand/pure-khetar-mark.png"
          alt="Pure Khetar logo"
          fill
          sizes="64px"
          className="object-contain"
          priority
        />
      </span>
    </Link>
  );
}
