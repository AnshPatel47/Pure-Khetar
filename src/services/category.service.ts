import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { CategorySummary } from '@/types/category';

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
        _count: { select: { products: true } },
      },
    });

    return categories.map(({ _count, ...category }) => ({ ...category, productCount: _count.products }));
  },
  ['categories:all'],
  { revalidate: 300, tags: [CATEGORY_CACHE_TAG] },
);
