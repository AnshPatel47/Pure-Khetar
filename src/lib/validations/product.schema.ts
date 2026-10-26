import { z } from 'zod';
import type { ProductQuery } from '@/types/product';

/** Query string accepted by /shop and /api/products. Invalid values fall back to defaults. */
export const productQuerySchema = z.object({
  q: z.string().trim().max(60).optional(),
  category: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+$/)
    .max(60)
    .optional(),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'name']).catch('newest').default('newest'),
  limit: z.coerce.number().int().min(1).max(48).catch(24).default(24),
});

export function parseProductQuery(input: Record<string, string | string[] | undefined>): ProductQuery {
  const flat = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
  const result = productQuerySchema.safeParse(flat);
  return result.success ? { ...result.data, q: result.data.q || undefined } : { sort: 'newest', limit: 24 };
}

/** For the future admin panel — validates product create / update forms. */
export const productInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens'),
  description: z.string().trim().min(10).max(600),
  price: z.number().positive().max(100_000),
  unit: z.string().trim().min(1).max(12).default('kg'),
  stock: z.number().int().min(0).max(100_000),
  images: z.array(z.string().startsWith('/')).min(1),
  isOrganic: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1),
});

export type ProductInput = z.infer<typeof productInputSchema>;
