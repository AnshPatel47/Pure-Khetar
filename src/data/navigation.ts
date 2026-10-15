export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string; description?: string; image?: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Shop',
    href: '/shop',
    children: [
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
  {
    label: 'Our Farm',
    href: '/our-farm',
    children: [
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