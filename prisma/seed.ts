import { PrismaClient } from '@prisma/client';
<<<<<<< HEAD
import { SEED_CATEGORIES } from '../src/data/categories';
import { SEED_PRODUCTS } from '../src/data/products';

const prisma = new PrismaClient();

/**
 * Safe to run any number of times:
 *  • creates categories / products that don't exist yet,
 *  • refreshes their descriptive fields (name, description, images…),
 *  • NEVER touches users, orders, carts — and never overwrites price or stock,
 *    so changes made later (e.g. from an admin panel) are kept.
 */
async function main() {
  const categoryIds = new Map<string, string>();

  for (const category of SEED_CATEGORIES) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, description: category.description, image: category.image },
      create: { ...category },
    });
    categoryIds.set(category.slug, saved.id);
  }

  for (const { categorySlug, images, ...product } of SEED_PRODUCTS) {
    const categoryId = categoryIds.get(categorySlug);
    if (!categoryId) throw new Error(`Unknown category "${categorySlug}" for product "${product.slug}"`);

    const { price, stock, ...descriptive } = product;
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...descriptive, images: [...images], categoryId },
      create: { ...product, images: [...images], categoryId },
    });
  }

  const [categories, products] = await Promise.all([prisma.category.count(), prisma.product.count()]);
  console.log(`✅ Seed complete — ${categories} categories, ${products} products in the database.`);
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
=======

const prisma = new PrismaClient();

async function main() {
  // Clear existing database records
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create Categories
  const vegCategory = await prisma.category.create({
    data: {
      name: 'Fresh Vegetables',
      slug: 'vegetables',
      description: 'Harvested daily from our Kamana organic plots.',
      image: '/images/products/fulawar.jpeg',
    },
  });

  const fruitingCategory = await prisma.category.create({
    data: {
      name: 'Fruiting Veggies',
      slug: 'fruiting',
      description: 'Vine-ripened natural organic vegetables.',
      image: '/images/products/ringan.jpeg',
    },
  });

  // Create Products using real user media assets
  await prisma.product.create({
    data: {
      name: 'Organic Ringan (Eggplant)',
      slug: 'organic-ringan',
      description: 'Tender, pesticide-free local Ringan grown under traditional net-house farming at Kamana.',
      price: 45.0,
      unit: 'kg',
      stock: 120,
      images: ['/images/products/ringan.jpeg'],
      isOrganic: true,
      isFeatured: true,
      categoryId: fruitingCategory.id,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Fresh Organic Fulawar (Cauliflower)',
      slug: 'fresh-fulawar',
      description: 'Crisp, snow-white organic cauliflower harvested at sunrise by Sureshbhai and team.',
      price: 60.0,
      unit: 'pc',
      stock: 85,
      images: ['/images/products/fulawar.jpeg'],
      isOrganic: true,
      isFeatured: true,
      categoryId: vegCategory.id,
    },
  });

  console.log('🌱 Database seeded successfully with real farm assets!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
