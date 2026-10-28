import { ProductGrid } from '@/components/products/ProductGrid';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { safeQuery } from '@/lib/safe-query';
import { getFeaturedProducts } from '@/services/product.service';

/** Today's harvest, straight from the database. Streams in behind a skeleton. */
export async function FeaturedProducts() {
  const products = await safeQuery('featured products', () => getFeaturedProducts(4), []);

  return (
    <Container as="section" className="py-16 lg:py-24">
      <SectionHeading
        title="Today's fresh harvest"
        description="Picked at the farm and delivered to your door."
        eyebrow="Directly from Kamana"
        action={{ label: 'View all produce', href: '/shop' }}
        className="mb-10"
      />
      <ProductGrid
        products={products}
        priorityCount={0}
        emptyTitle="The next harvest is on its way"
        emptyDescription="We are updating the shelf — please check back shortly."
      />
    </Container>
  );
}

export function FeaturedProductsSkeleton() {
  return (
    <Container as="section" className="py-16 lg:py-24" aria-hidden>
      <div className="mb-10 h-24 max-w-md animate-pulse rounded-2xl bg-sage/15" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-3xl border border-sage/10 bg-white">
            <div className="aspect-[4/3] animate-pulse bg-sage/15" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-sage/15" />
              <div className="h-4 w-full animate-pulse rounded bg-sage/10" />
              <div className="h-10 w-full animate-pulse rounded-full bg-sage/15" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
