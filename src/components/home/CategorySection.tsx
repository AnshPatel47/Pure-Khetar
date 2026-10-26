import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SmartImage } from '@/components/ui/SmartImage';
import { safeQuery } from '@/lib/safe-query';
import { getCategories } from '@/services/category.service';

export async function CategorySection() {
  const categories = await safeQuery('categories', () => getCategories(), []);
  if (categories.length === 0) return null;

  return (
    <Container as="section" className="pb-4 pt-16 lg:pt-20">
      <SectionHeading title="Shop by category" description="Start with what is in season on our farm." className="mb-8" />

      <ul className="grid gap-5 sm:grid-cols-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/shop?category=${category.slug}`}
              className="group relative block aspect-[16/10] overflow-hidden rounded-3xl bg-forest shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2"
            >
              {category.image && (
                <SmartImage
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cream">{category.name}</h3>
                  <p className="mt-1 text-sm text-cream/75">
                    {category.productCount} {category.productCount === 1 ? 'item' : 'items'}
                    {category.description ? ` · ${category.description}` : ''}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marigold text-forest transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
