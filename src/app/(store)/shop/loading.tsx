import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ShopLoading() {
  return (
    <Container className="space-y-8 py-10" aria-busy>
      <Skeleton className="h-48 w-full rounded-3xl bg-forest/15" />
      <Skeleton className="h-12 w-full max-w-xl rounded-full" />
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-10 w-32 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 rounded-3xl border border-sage/10 bg-white p-4">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
        ))}
      </div>
    </Container>
  );
}
