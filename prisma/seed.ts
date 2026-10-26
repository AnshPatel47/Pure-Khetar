import { PrismaClient } from '@prisma/client';
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
