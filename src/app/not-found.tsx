import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-7xl font-bold text-marigold">404</p>
      <h1 className="mt-4 font-serif text-3xl font-bold text-forest">This row isn&apos;t planted yet</h1>
      <p className="mt-3 max-w-md text-forest/65">
        The page you are looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the harvest.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/shop" variant="outline">
          Browse produce
        </Button>
      </div>
    </Container>
  );
}
