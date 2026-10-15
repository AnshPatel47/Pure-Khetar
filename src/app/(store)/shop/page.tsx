import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/products/ProductGrid';
import Link from 'next/link';
import { Sprout } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ShopPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const selectedCategory =
    typeof searchParams?.category === 'string' ? searchParams.category : undefined;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.product.findMany({
      where: selectedCategory
        ? {
            category: {
              slug: selectedCategory,
            },
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner Header */}
      <div className="bg-[#1F4D2E] text-[#FAF6EC] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[#E0A528]">
            <Sprout className="w-4 h-4" />
            <span>100% Pure Organic</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold">
            Kamana Farm Marketplace
          </h1>
          <p className="text-sm sm:text-base text-[#FAF6EC]/80 leading-relaxed">
            Nourished with natural A2 Vedic manure and harvested daily at sunrise. Zero synthetic chemicals or pesticides.
          </p>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/shop"
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
            !selectedCategory
              ? 'bg-[#1F4D2E] text-white shadow-md'
              : 'bg-white border border-[#7A9A6B]/30 text-[#1F4D2E] hover:bg-[#7A9A6B]/10'
          }`}
        >
          All Produce ({products.length})
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.slug}`}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === cat.slug
                ? 'bg-[#1F4D2E] text-white shadow-md'
                : 'bg-white border border-[#7A9A6B]/30 text-[#1F4D2E] hover:bg-[#7A9A6B]/10'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Products Display Grid */}
      <ProductGrid products={products} />
    </div>
  );
}