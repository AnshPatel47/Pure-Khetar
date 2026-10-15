import { PrismaClient } from '@prisma/client';

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