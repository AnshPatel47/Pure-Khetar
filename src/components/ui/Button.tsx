import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'whatsapp' | 'glass';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-forest text-cream shadow-sm hover:bg-forest-l hover:shadow-natural',
  accent: 'bg-marigold text-forest shadow-glow-gold hover:bg-white hover:shadow-natural-lg',
  outline: 'border border-forest/25 bg-transparent text-forest hover:bg-forest/5',
  ghost: 'text-forest hover:bg-forest/5',
  whatsapp: 'border border-whatsapp/30 bg-whatsapp/10 text-whatsapp-dk hover:bg-whatsapp/20',
  glass: 'glass text-cream hover:bg-white/15',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs gap-1.5',
  md: 'px-5 py-3 text-sm gap-2',
  lg: 'px-7 py-4 text-sm gap-2',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>)
  );

/** One button for the whole site: renders <Link>, <a> or <button> depending on props. */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    'group inline-flex select-none items-center justify-center rounded-full font-bold transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-cream',
    'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  );

  const content = (
    <>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : leftIcon}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, target, rel, ...anchorRest } = rest;
    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', disabled, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} disabled={disabled || loading} aria-busy={loading || undefined} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
