import { PrismaClient } from '@prisma/client';
import { SEED_CATEGORIES } from '../src/data/categories';
import { SEED_PRODUCTS } from '../src/data/products';
import bcrypt from 'bcryptjs';

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
      update: { ...descriptive, price, images: [...images], categoryId },
      create: { ...product, images: [...images], categoryId },
    });
  }

  await prisma.product.updateMany({ where: { slug: 'natural-papaya' }, data: { comingSoon: true, available: false, deletedAt: null, price: 55 } });
  await prisma.product.updateMany({ where: { slug: { in: ['natural-ringan', 'natural-deti', 'fresh-fulawar'] } }, data: { available: true, deletedAt: null, comingSoon: false } });
  await prisma.product.updateMany({ where: { slug: 'baby-eggplant' }, data: { available: false, deletedAt: new Date() } });

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (adminEmail) {
    const password = process.env.ADMIN_PASSWORD_HASH
      ? process.env.ADMIN_PASSWORD_HASH
      : await bcrypt.hash(process.env.ADMIN_PASSWORD || 'ChangeMeNow123!', 12);
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { role: 'ADMIN', password },
      create: { name: 'Pure Khetar Admin', email: adminEmail, password, role: 'ADMIN' },
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
