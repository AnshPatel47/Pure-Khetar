import { Container } from '@/components/layout/Container';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: ReactNode;
}

/** Green banner used at the top of simple content pages. */
export function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <section className="bg-forest text-cream">
      <Container className="space-y-4 py-14 sm:py-20">
        {eyebrow && <p className="text-sm font-semibold text-marigold">{eyebrow}</p>}
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight text-balance sm:text-5xl">{title}</h1>
        {description && <p className="max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
