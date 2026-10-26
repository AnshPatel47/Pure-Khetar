'use client';

import dynamic from 'next/dynamic';
import { LazyMount } from '@/components/ui/LazyMount';
import { Skeleton } from '@/components/ui/Skeleton';
import { Container } from '@/components/layout/Container';

/** Placeholder with the same height as the real section so the page doesn't jump. */
function SectionPlaceholder({ height }: { height: string }) {
  return (
    <Container aria-hidden className="py-16">
      <Skeleton className={height} />
    </Container>
  );
}

// ssr:false + dynamic() → the section's JavaScript is a separate file that is only
// downloaded when the visitor scrolls near it.
const FarmReels = dynamic(() => import('./FarmReels').then((m) => m.FarmReels), {
  ssr: false,
  loading: () => <SectionPlaceholder height="h-[560px]" />,
});
const WeeklyBasketSection = dynamic(() => import('./WeeklyBasketSection').then((m) => m.WeeklyBasketSection), {
  ssr: false,
  loading: () => <SectionPlaceholder height="h-[420px]" />,
});
const BlogPreview = dynamic(() => import('./BlogPreview').then((m) => m.BlogPreview), { ssr: false });

export function LazyFarmReels() {
  return (
    <LazyMount placeholder={<SectionPlaceholder height="h-[560px]" />}>
      <FarmReels />
    </LazyMount>
  );
}

export function LazyWeeklyBasket() {
  return (
    <LazyMount placeholder={<SectionPlaceholder height="h-[420px]" />}>
      <WeeklyBasketSection />
    </LazyMount>
  );
}

export function LazyBlogPreview() {
  return (
    <LazyMount>
      <BlogPreview />
    </LazyMount>
  );
}
