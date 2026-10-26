import { NextResponse, type NextRequest } from 'next/server';
import { parseProductQuery } from '@/lib/validations/product.schema';
import { getProducts, searchProducts } from '@/services/product.service';

/** GET /api/products?q=ringan&category=fruiting&sort=price-asc&limit=6 */
export async function GET(request: NextRequest) {
  const query = parseProductQuery(Object.fromEntries(request.nextUrl.searchParams));

  try {
    const products = query.q ? await searchProducts(query.q, query.limit) : await getProducts(query);
    return NextResponse.json(
      { products },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (error) {
    console.error('[api/products] failed:', error);
    return NextResponse.json({ error: 'Could not load products.' }, { status: 500 });
  }
}
