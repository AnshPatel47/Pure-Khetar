import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { safeQuery } from '@/lib/safe-query';
import { getCategories } from '@/services/category.service';
import { CategoryAccordion } from './CategoryAccordion';

export async function CategorySection() {
  const categories = await safeQuery('categories', () => getCategories(), []);
  if (categories.length === 0) return null;

  return (
    <Container as="section" className="pb-4 pt-16 lg:pt-20">
      <SectionHeading title="Shop by category" description="Start with what is in season on our farm." className="mb-8" />
      <CategoryAccordion categories={categories} />
    </Container>
  );
}
