export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  isOrganic: boolean;
  isFeatured: boolean;
  category: { name: string; slug: string };
}

export type ProductSort = 'newest' | 'price-asc' | 'price-desc' | 'name';

export interface ProductQuery {
  category?: string;
  q?: string;
  sort?: ProductSort;
  limit?: number;
}
