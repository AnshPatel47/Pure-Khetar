import { Container } from '@/components/layout/Container';
import { Skeleton } from '@/components/ui/Skeleton';

/** Shown instantly while any page without its own loading state is being prepared. */
export default function Loading() {
  return (
    <Container className="space-y-6 py-16" aria-busy>
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-5 w-full max-w-xl" />
      <div className="grid gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-72" />
        ))}
      </div>
    </Container>
  );
}
