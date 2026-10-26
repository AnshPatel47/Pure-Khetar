/**
 * Products written to the database by `npm run db:seed`.
 * Prices reflect current Gujarat market rates (Oct 2026).
 * Each product includes real farm images from Kamana farm.
 */
export const SEED_PRODUCTS = [
  {
    slug: 'organic-ringan',
    name: 'Organic Ringan (Eggplant)',
    description:
      'Tender, pesticide-free local Ringan grown under traditional net-house farming at Kamana. Harvested at sunrise for peak freshness. Current market rate: ₹45–60/kg.',
    price: 45,
    unit: 'kg',
    stock: 120,
    images: ['/images/products/ringan.jpeg', '/images/farm/baby-eggplant.jpeg', '/images/products/r2.jpeg'],
    isOrganic: true,
    isFeatured: true,
    categorySlug: 'fruiting',
  },
  {
    slug: 'fresh-fulawar',
    name: 'Fresh Organic Fulawar (Cauliflower)',
    description:
      'Crisp, snow-white organic cauliflower harvested at sunrise by Sureshbhai and team. No pesticides, no chemicals — just pure Vedic farming. Market rate: ₹50–80/pc.',
    price: 60,
    unit: 'pc',
    stock: 85,
    images: ['/images/products/fulawar.jpeg', '/images/products/fulawarPlant.jpeg'],
    isOrganic: true,
    isFeatured: true,
    categorySlug: 'vegetables',
  },
  {
    slug: 'organic-papaya',
    name: 'Organic Papaya (Papita)',
    description:
      'Sweet, sun-ripened organic papaya from our Kamana farm. Rich in enzymes and grown with A2 Vedic manure — zero synthetic inputs. Current market rate: ₹50–70/kg.',
    price: 55,
    unit: 'kg',
    stock: 60,
    images: [
      '/images/products/papaya.jpeg',
      '/images/products/papaya2.jpeg',
      '/images/products/papaya3.jpeg',
      '/images/products/organicPapayaTree.jpeg',
    ],
    isOrganic: true,
    isFeatured: true,
    categorySlug: 'fruits',
  },
  {
    slug: 'fresh-dudhi',
    name: 'Fresh Dudhi (Bottle Gourd)',
    description:
      'Farm-fresh bottle gourd harvested daily at Kamana. Light, nutritious and grown without any chemicals or synthetic fertilizers. Market rate: ₹25–40/kg.',
    price: 30,
    unit: 'kg',
    stock: 90,
    images: ['/images/farm/plant.jpeg', '/images/farm/farmPic.jpeg'],
    isOrganic: true,
    isFeatured: true,
    categorySlug: 'vegetables',
  },
  {
    slug: 'baby-eggplant',
    name: 'Baby Eggplant (Small Ringan)',
    description:
      'Tender young eggplants with a mild, delicate flavour — perfect for bharta or sabzi. Hand-picked each morning from our net-house rows. Market rate: ₹45–65/kg.',
    price: 48,
    unit: 'kg',
    stock: 75,
    images: ['/images/farm/baby-eggplant.jpeg', '/images/farm/babyEggplant.jpeg.jpeg'],
    isOrganic: true,
    isFeatured: false,
    categorySlug: 'fruiting',
  },
] as const;
