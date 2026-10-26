<<<<<<< HEAD
import { COMMERCE } from '@/lib/constants';

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  image?: string;
}

=======
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
export interface NavItem {
  label: string;
  href: string;
  badge?: string;
<<<<<<< HEAD
  children?: NavChild[];
=======
  children?: { label: string; href: string; description?: string; image?: string }[];
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
<<<<<<< HEAD
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
=======
      { label: 'Fresh Vegetables', href: '/shop?category=vegetables', description: 'Harvested daily', image: '/images/products/fulawar.jpeg' },
      { label: 'Fruiting Veggies', href: '/shop?category=fruiting', description: 'Fresh Ringan & Tomatoes', image: '/images/products/ringan.jpeg' },
      { label: 'Leafy Greens', href: '/shop?category=leafy', description: 'Organic Spinach & Coriander' },
      { label: 'Roots & Gourds', href: '/shop?category=roots', description: 'Carrots, Radish & Beetroot' },
    ],
  },
  {
    label: 'Weekly Baskets',
    href: '/weekly-baskets',
    badge: 'Bestseller',
  },
  {
    label: 'Our Journey',
    href: '/journey',
  },
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
  {
    label: 'Our Farm',
    href: '/our-farm',
    children: [
<<<<<<< HEAD
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
=======
      { label: 'Kamana Net-House', href: '/our-farm#nethouse', description: 'Protected organic farming', image: '/images/farm/nethouse-farming.jpeg' },
      { label: 'Gir Cow Dairy', href: '/our-farm#dairy', description: 'A2 Vedic manure & farming' },
      { label: 'Lab Reports', href: '/our-farm#lab-reports', description: 'Zero chemical residue proof' },
    ],
  },
  {
    label: 'Our Team',
    href: '/team',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
];
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
