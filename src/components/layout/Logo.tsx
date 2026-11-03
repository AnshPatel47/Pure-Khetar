import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Size variant: 'sm' for compact navbar, 'md' for default */
  size?: 'sm' | 'md';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const logoSize = size === 'sm' ? 58 : 66;
  const wordmarkSize = size === 'sm' ? 'text-[18px]' : 'text-[22px]';

  return (
    <Link href="/" aria-label="Pure Khetar — home" className={cn('group flex shrink-0 items-center gap-2.5', className)}>
      <span
        className="relative flex shrink-0 items-center justify-center transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ width: logoSize, height: logoSize }}
      >
        <Image
          src="/icons/brand/pure-khetar-emblem-v2.png"
          alt=""
          fill
          sizes="72px"
          className="object-contain"
          priority
        />
      </span>
      <span className={cn('whitespace-nowrap font-serif font-bold leading-none tracking-[-0.02em]', wordmarkSize)}>
        <span className="text-[#173f2a]">Pure</span>{' '}<span className="text-[#71804a]">Khetar</span>
      </span>
    </Link>
  );
}
