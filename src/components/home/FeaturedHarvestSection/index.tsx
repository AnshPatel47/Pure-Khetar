import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AddToCartButton } from '@/components/products/AddToCartButton';

/* Fallback products when DB is unavailable */
const FALLBACK_PRODUCTS = [
  {
    id: 'f1',
    slug: 'f1',
    name: 'Natural Ringan (Baby Eggplant)',
    description: 'Tender baby eggplants grown in net-house, nourished with A2 Vedic manure. Zero pesticides.',
    price: 60,
    unit: 'kg',
    stock: 0,
    images: ['/images/products/ringan.jpeg'],
  },
  {
    id: 'f2',
    slug: 'f2',
    name: 'Natural Fulawar (Cauliflower)',
    description: 'Crisp, white cauliflower heads straight from Kamana net-house plots. Harvested at sunrise.',
    price: 80,
    unit: 'kg',
    stock: 0,
    images: ['/images/products/fulawar.jpeg'],
  },
  {
    id: 'f3',
    slug: 'f3',
    name: 'Farm Fresh Baby Eggplant',
    description: 'Plump, glossy baby eggplants. Perfect for Gujarati curries. Delivered same morning.',
    price: 55,
    unit: 'kg',
    stock: 0,
    images: ['/images/products/baby-eggplant.jpeg'],
  },
];

async function getProducts() {
  try {
    const { prisma } = await import('@/lib/prisma');
    const products = await prisma.product.findMany({ take: 4, orderBy: { createdAt: 'desc' } });
    return products.length > 0 ? products : FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export async function FeaturedHarvestSection() {
  const products = await getProducts();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      {/* Section header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Directly from Kamana
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Today&apos;s Fresh Harvest
          </h2>
          <p className="text-gray-500 text-sm mt-1.5">Picked this morning. Delivered to your door.</p>
        </div>
        <Link
          href="/shop"
          className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-forest hover:text-terracotta transition-colors group"
        >
          <span>View All Produce</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl border border-sage/10 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
          >
            {/* Product image */}
            <Link
              href={`/products/${product.slug}`}
              className="relative block h-56 w-full overflow-hidden bg-cream"
            >
              <Image
                src={product.images[0] || '/images/products/ringan.jpeg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-3 left-3 bg-marigold text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                100% Natural
              </span>
            </Link>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-serif text-base font-bold text-forest group-hover:text-terracotta transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1">
                {product.description}
              </p>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-sage/10">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-medium">Price</span>
                  <p className="font-serif text-lg font-bold text-forest leading-none">
                    ₹{product.price}
                    <span className="text-xs font-normal text-gray-400 ml-1">/{product.unit}</span>
                  </p>
                </div>
                <AddToCartButton
                  product={product}
                  className="flex items-center gap-1.5 bg-forest text-cream text-xs font-bold px-4 py-2.5 rounded-full hover:bg-forest-l transition-colors shadow-organic group-hover:shadow-organic-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile view all */}
      <div className="sm:hidden text-center mt-7">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-3.5 rounded-full font-bold text-sm shadow-organic"
        >
          View All Produce
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}