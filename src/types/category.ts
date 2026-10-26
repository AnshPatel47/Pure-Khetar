export interface CategorySummary {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  productCount: number;
}
