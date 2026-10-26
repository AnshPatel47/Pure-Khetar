import { FALLBACK_PRODUCT_IMAGE } from './constants';
import type { CartItemInput } from '@/types/cart';
import type { ProductSummary } from '@/types/product';

export type PurchasableProduct = Pick<
  ProductSummary,
  'id' | 'slug' | 'name' | 'price' | 'unit' | 'images' | 'stock'
>;

/** Converts a product from the database into the shape stored in the cart. */
export function toCartItem(product: PurchasableProduct): CartItemInput {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    unit: product.unit,
    image: product.images[0] ?? FALLBACK_PRODUCT_IMAGE,
    stock: product.stock,
  };
}
