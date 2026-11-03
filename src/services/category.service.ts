import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { CategorySummary } from '@/types/category';
import { LIVE_PRODUCT_SLUGS } from './product.service';

export const CATEGORY_CACHE_TAG = 'categories';

export const getCategories = unstable_cache(
  async (): Promise<CategorySummary[]> => {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        image: true,
        products: { where: { slug: { in: [...LIVE_PRODUCT_SLUGS] } }, select: { id: true } },
      },
    });

    return categories
      .map(({ products, ...category }) => ({ ...category, productCount: products.length }))
      .filter((category) => category.productCount > 0);
  },
  ['categories:all'],
  { revalidate: 300, tags: [CATEGORY_CACHE_TAG] },
);
