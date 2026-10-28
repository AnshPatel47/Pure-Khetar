import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import { safeQuery } from '@/lib/safe-query';
import { absoluteUrl } from '@/lib/utils';
import { getAllProductSlugs } from '@/services/product.service';

export const revalidate = 3600;

const STATIC_PAGES = ['/', '/shop', '/journey', '/our-farm', '/team', '/blog', '/contact'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await safeQuery('sitemap products', () => getAllProductSlugs(), []);

  return [
    ...STATIC_PAGES.map((path) => ({ url: absoluteUrl(path), changeFrequency: 'weekly' as const })),
    ...products.map((p) => ({ url: absoluteUrl(`/products/${p.slug}`), lastModified: p.updatedAt })),
    ...BLOG_POSTS.map((post) => ({ url: absoluteUrl(`/blog/${post.slug}`), lastModified: post.date })),
  ];
}
