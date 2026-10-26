/** Categories written to the database by `npm run db:seed`. */
export const SEED_CATEGORIES = [
  {
    slug: 'vegetables',
    name: 'Fresh Vegetables',
    description: 'Harvested daily from our Kamana organic plots.',
    image: '/images/products/fulawar.jpeg',
  },
  {
    slug: 'fruiting',
    name: 'Fruiting Veggies',
    description: 'Vine-ripened natural organic vegetables.',
    image: '/images/products/ringan.jpeg',
  },
  {
    slug: 'fruits',
    name: 'Fresh Fruits',
    description: 'Sun-ripened organic fruits from the Kamana farm.',
    image: '/images/products/papaya.jpeg',
  },
] as const;

