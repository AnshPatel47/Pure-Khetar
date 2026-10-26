import { unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import type { ProductQuery, ProductSummary } from '@/types/product';

export const PRODUCT_CACHE_TAG = 'products';
const REVALIDATE_SECONDS = 120;

const productSelect = {
  id: true,
  slug: true,
  name: true,
  description: true,
  price: true,
  unit: true,
  stock: true,
  images: true,
  isOrganic: true,
  isFeatured: true,
  category: { select: { name: true, slug: true } },
} satisfies Prisma.ProductSelect;

function orderBy(sort: ProductQuery['sort']): Prisma.ProductOrderByWithRelationInput {
  switch (sort) {
    case 'price-asc':
      return { price: 'asc' };
    case 'price-desc':
      return { price: 'desc' };
    case 'name':
      return { name: 'asc' };
    default:
      return { createdAt: 'desc' };
  }
}

function buildWhere({ category, q }: ProductQuery): Prisma.ProductWhereInput {
  return {
    ...(category ? { category: { slug: category } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {}),
  };
}

/** Product list for the shop page. Cached; filters are part of the cache key. */
export const getProducts = unstable_cache(
  async (query: ProductQuery = {}): Promise<ProductSummary[]> =>
    prisma.product.findMany({
      where: buildWhere(query),
      orderBy: orderBy(query.sort),
      take: query.limit ?? 24,
      select: productSelect,
    }),
  ['products:list'],
  { revalidate: REVALIDATE_SECONDS, tags: [PRODUCT_CACHE_TAG] },
);

export const getFeaturedProducts = unstable_cache(
  async (limit = 4): Promise<ProductSummary[]> =>
    prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: productSelect,
    }),
  ['products:featured'],
  { revalidate: REVALIDATE_SECONDS, tags: [PRODUCT_CACHE_TAG] },
);

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<ProductSummary | null> =>
    prisma.product.findUnique({ where: { slug }, select: productSelect }),
  ['products:by-slug'],
  { revalidate: REVALIDATE_SECONDS, tags: [PRODUCT_CACHE_TAG] },
);

export const getRelatedProducts = unstable_cache(
  async (productId: string, categorySlug: string, limit = 4): Promise<ProductSummary[]> =>
    prisma.product.findMany({
      where: { id: { not: productId }, category: { slug: categorySlug } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: productSelect,
    }),
  ['products:related'],
  { revalidate: REVALIDATE_SECONDS, tags: [PRODUCT_CACHE_TAG] },
);

/** Live search for the navbar overlay — not cached because input is free-form. */
export async function searchProducts(q: string, limit = 6): Promise<ProductSummary[]> {
  return prisma.product.findMany({
    where: buildWhere({ q }),
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: productSelect,
  });
}

/** For sitemap.xml. */
export async function getAllProductSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return prisma.product.findMany({ select: { slug: true, updatedAt: true } });
}
