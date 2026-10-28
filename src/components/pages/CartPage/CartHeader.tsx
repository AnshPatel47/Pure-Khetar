import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export function CartHeader({ count }: { count: number }) {
  return (
    <div className="border-b border-sage/10 bg-white">
      <Container className="py-8">
        <Reveal>
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-terracotta">
                <Leaf className="h-3.5 w-3.5" aria-hidden />
                Your natural crate
              </p>
              <h1 className="font-serif text-3xl font-bold text-forest sm:text-4xl">
                Cart
                {count > 0 && <span className="ml-3 text-lg font-normal text-sage">({count} items)</span>}
              </h1>
            </div>
            <Link href="/shop" className="hidden text-sm font-semibold text-forest/60 transition-colors hover:text-forest sm:block">
              ← Continue shopping
            </Link>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
