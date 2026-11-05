import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  /** Size variant: 'sm' for compact navbar, 'md' for default */
  size?: 'sm' | 'md';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const logoSize = size === 'sm' ? 68 : 82;

  return (
    <Link
      href="/"
      aria-label="Pure Khetar — home"
      className={cn('group flex shrink-0 items-center transition-transform duration-500 hover:scale-[1.02]', className)}
    >
      <span
        className="relative flex shrink-0 items-center"
        style={{ width: size === 'sm' ? 148 : 180, height: logoSize }}
      >
        <Image
          src="/icons/brand/Pure Khetar Nature Logo.png"
          alt="Pure Khetar"
          fill
          sizes="(max-width: 640px) 148px, 180px"
          className="object-contain object-left"
          priority
        />
      </span>
    </Link>
  );
}
