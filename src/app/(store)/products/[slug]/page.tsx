<<<<<<< HEAD
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRight, PackageCheck, Sprout, Truck } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductPurchasePanel } from '@/components/products/ProductPurchasePanel';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMMERCE, SITE } from '@/lib/constants';
import { absoluteUrl, formatPrice } from '@/lib/utils';
import { getProductBySlug, getRelatedProducts } from '@/services/product.service';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };

  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.images.slice(0, 1) },
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.id, product.category.slug, 4);
  const soldOut = product.stock <= 0;

  // Structured data so search engines can show price and availability.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: COMMERCE.currency,
      price: product.price,
      availability: soldOut ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      url: absoluteUrl(`/products/${product.slug}`),
    },
  };

  const perks = [
    { icon: Sprout, text: 'Grown on our family farm in Kamana, Visnagar' },
    { icon: PackageCheck, text: 'Packed fresh for your order' },
    {
      icon: Truck,
      text: `Delivery ${formatPrice(COMMERCE.deliveryFee)} · free above ${formatPrice(COMMERCE.freeDeliveryThreshold)}`,
    },
  ];

  return (
    <Container className="space-y-16 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="space-y-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-forest/60">
          <Link href="/" className="hover:text-forest">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <Link href="/shop" className="hover:text-forest">Shop</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <Link href={`/shop?category=${product.category.slug}`} className="hover:text-forest">
            {product.category.name}
          </Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span aria-current="page" className="text-forest">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div className="space-y-6 lg:py-4">
            <div className="flex flex-wrap items-center gap-2">
              {product.isOrganic && <Badge variant="organic">Organic</Badge>}
              <Badge variant={soldOut ? 'danger' : 'soft'}>
                {soldOut ? 'Sold out' : product.stock <= 10 ? `Only ${product.stock} left` : 'In stock'}
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-3xl font-bold leading-tight text-forest sm:text-4xl">{product.name}</h1>
              <p className="font-serif text-3xl font-bold text-terracotta">
                {formatPrice(product.price)}
                <span className="ml-1.5 text-base font-normal text-forest/50">per {product.unit}</span>
              </p>
            </div>

            <p className="text-base leading-relaxed text-forest/75">{product.description}</p>

            <ProductPurchasePanel product={product} />

            <ul className="space-y-3 rounded-2xl border border-sage/20 bg-white p-5">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-forest/80">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-forest/10 text-forest">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-8">
          <SectionHeading title="More from this field" action={{ label: 'View all produce', href: '/shop' }} />
          <h2 id="related-heading" className="sr-only">Related products</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </Container>
  );
}
=======
import { ComingSoonPage } from '@/components/pages/ComingSoonPage';

export default function Page() {
  return (
    <ComingSoonPage
      title="Product details"
      description="This product page is being prepared. Visit the shop to browse the available harvest."
    />
  );
}
>>>>>>> 92b162cf2f90d0b1754d9132ba0a059cf0292deb
