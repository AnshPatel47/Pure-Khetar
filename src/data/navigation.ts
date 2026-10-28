import { COMMERCE } from '@/lib/constants';

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Our Farm', href: '/our-farm' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const ANNOUNCEMENTS = [
  `🌿 Free delivery on orders above ₹${COMMERCE.freeDeliveryThreshold} — straight from our Kamana farm`,
  '🧺 Morning harvest window: 5 AM – 7 AM daily',
  '✅ Lab-tested produce — reports on our farm page',
  '🐄 Nourished with natural cow-dung manure',
];

/** True when `pathname` is the nav item's page or one of its sub-pages. */
export function isActivePath(pathname: string, href: string): boolean {
  const base = href.split(/[?#]/)[0];
  if (base === '/') return pathname === '/';
  return pathname === base || pathname.startsWith(`${base}/`);
}
