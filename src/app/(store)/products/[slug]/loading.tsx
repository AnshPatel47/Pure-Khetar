import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductLoading() {
  return (
    <Container className="space-y-8 py-10" aria-busy>
      <Skeleton className="h-4 w-72" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[4/5] rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]" />
        <div className="space-y-5 lg:py-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-14 w-full rounded-full" />
        </div>
      </div>
    </Container>
  );
}
