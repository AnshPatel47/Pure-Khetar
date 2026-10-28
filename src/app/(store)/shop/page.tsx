import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { PageHero } from '@/components/pages/PageHero';
import { parseProductQuery } from '@/lib/validations/product.schema';
import { getCategories } from '@/services/category.service';
import { getProducts } from '@/services/product.service';

export const metadata: Metadata = {
  title: 'Shop fresh produce',
  description: 'Fresh vegetables grown on our family farm in Kamana, Gujarat — order online for doorstep delivery.',
};

interface ShopPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function ShopPage({ searchParams = {} }: ShopPageProps) {
  const query = parseProductQuery(searchParams);
  const [categories, products] = await Promise.all([getCategories(), getProducts(query)]);

  const totalCount = categories.reduce((sum, category) => sum + category.productCount, 0);
  const activeCategory = categories.find((category) => category.slug === query.category);
  const filtered = Boolean(query.q || query.category);

  return (
    <>
      <PageHero
        bgImage="/images/farm/Farming.jpeg"
        eyebrow="100% Pure Natural"
        title="Kamana Farm Marketplace"
        description="Nourished with A2 Vedic manure and harvested daily at sunrise. Zero synthetic chemicals or pesticides."
      />

      <Container className="space-y-8 py-10">
        <Suspense fallback={<div className="h-28 animate-pulse rounded-3xl bg-sage/10" aria-hidden />}>
          <ProductFilters categories={categories} totalCount={totalCount} />
        </Suspense>

        <section aria-labelledby="results-heading" className="space-y-5">
          <h2 id="results-heading" className="text-sm font-semibold text-forest/60" aria-live="polite">
            {filtered
              ? `${products.length} ${products.length === 1 ? 'result' : 'results'}${
                  query.q ? ` for "${query.q}"` : ''
                }${activeCategory ? ` in ${activeCategory.name}` : ''}`
              : `Showing all ${products.length} ${products.length === 1 ? 'product' : 'products'}`}
          </h2>
          <ProductGrid products={products} priorityCount={4} />
        </section>
      </Container>
    </>
  );
}
