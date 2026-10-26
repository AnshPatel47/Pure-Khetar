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
  {
    label: 'Shop',
    href: '/shop',
    children: [
      {
        label: 'Fresh Vegetables',
        href: '/shop?category=vegetables',
        description: 'Fulawar and more, harvested fresh',
        image: '/images/products/fulawar.jpeg',
      },
      {
        label: 'Fruiting Veggies',
        href: '/shop?category=fruiting',
        description: 'Ringan from our Kamana fields',
        image: '/images/products/ringan.jpeg',
      },
    ],
  },
  { label: 'Weekly Baskets', href: '/weekly-baskets', badge: 'New' },
  { label: 'Our Journey', href: '/journey' },
  {
    label: 'Our Farm',
    href: '/our-farm',
    children: [
      {
        label: 'Kamana Net-House',
        href: '/our-farm#nethouse',
        description: 'Shade-net beds and nursery',
        image: '/images/farm/nethouse-farming.jpeg',
      },
      { label: 'Farm Life & Dairy', href: '/our-farm#dairy', description: 'Cows, buffaloes and natural manure' },
      { label: 'Lab Reports', href: '/our-farm#lab-reports', description: 'Our testing and quality checks' },
    ],
  },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
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
