import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function JourneyCTA() {
  return (
    <section className="py-16 bg-cream-dk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl border border-sage/20 bg-white p-8 text-center sm:p-12 shadow-card">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{ backgroundImage: 'radial-gradient(circle at 3px 3px, #1F4D2E 1px, transparent 0)', backgroundSize: '28px 28px' }}
            />
            <h2 className="relative z-10 mb-4 font-serif text-3xl font-bold text-forest sm:text-4xl">Be Part of the Story</h2>
            <p className="relative z-10 mx-auto mb-8 max-w-xl text-forest/60">
              Every crate you order supports the farm family and keeps 50 years of natural farming heritage alive.
            </p>
            <div className="relative z-10 flex flex-wrap justify-center gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-marigold px-7 py-4 text-sm font-bold text-forest shadow-glow-gold transition-colors hover:bg-forest hover:text-cream">
                <Sprout className="h-4 w-4" />Shop Fresh Harvest
              </Link>
              <Link href="/our-farm" className="inline-flex items-center gap-2 rounded-full border border-forest/30 px-7 py-4 text-sm font-bold text-forest transition-colors hover:bg-forest hover:text-cream">
                Our Farm Story
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
