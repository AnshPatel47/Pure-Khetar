import Link from 'next/link';
import { ArrowRight, Sprout } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description: string;
}

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <main className="min-h-[60vh] bg-cream flex items-center justify-center px-4 py-16">
      <div className="max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest/10 text-forest">
          <Sprout className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-forest sm:text-4xl">{title}</h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">{description}</p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-cream transition-colors hover:bg-forest-l"
        >
          Explore the harvest
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
