/**
 * Products written to the database by `npm run db:seed`.
 * Prices reflect current Gujarat market rates (Oct 2026).
 * Each product includes real farm images from Kamana farm.
 */
export const SEED_PRODUCTS = [
  {
    slug: 'natural-ringan',
    name: 'Natural Ringan (Eggplant)',
    description:
      'Tender, pesticide-free local Ringan grown under traditional net-house farming at Kamana. Harvested at sunrise for peak freshness. Current market rate: ₹45–60/kg.',
    price: 45,
    unit: 'kg',
    stock: 120,
    images: ['/images/products/ringan.jpeg', '/images/farm/baby-eggplant.jpeg', '/images/products/r2.jpeg'],
    isChemicalFree: true,
    isFeatured: true,
    categorySlug: 'fruiting',
  },
  {
    slug: 'fresh-fulawar',
    name: 'Fresh Natural Fulawar (Cauliflower)',
    description:
      'Crisp, snow-white natural cauliflower harvested at sunrise by Sureshbhai and team. No pesticides, no chemicals — just pure Vedic farming. Market rate: ₹50–80/pc.',
    price: 60,
    unit: 'pc',
    stock: 85,
    images: ['/images/products/fulawar.jpeg', '/images/products/fulawarPlant.jpeg'],
    isChemicalFree: true,
    isFeatured: true,
    categorySlug: 'vegetables',
  },
  {
    slug: 'natural-papaya',
    name: 'Natural Papaya (Papita)',
    description:
      'Sweet, sun-ripened natural papaya from our Kamana farm. Rich in enzymes and grown with A2 Vedic manure — zero synthetic inputs. Current market rate: ₹50–70/kg.',
    price: 55,
    unit: 'kg',
    stock: 60,
    images: [
      '/images/products/papaya.jpeg',
      '/images/products/papaya2.jpeg',
      '/images/products/papaya3.jpeg',
      '/images/products/papaya3.jpeg',
    ],
    isChemicalFree: true,
    isFeatured: true,
    categorySlug: 'fruits',
  },
] as const;
