import Link from 'next/link';
import { Sprout, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function FarmCTA() {
  return (
    <section className="bg-cream-dk py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-forest rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle at 3px 3px, #E0A528 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />
            <p className="text-marigold text-xs font-bold uppercase tracking-widest mb-3 relative z-10">
              🌾 Taste the Difference
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4 relative z-10">
              From Our Soil to Your Table
            </h2>
            <p className="text-cream/70 mb-8 relative z-10 max-w-xl mx-auto">
              Order your first natural crate and experience what 50 years of chemical-free farming tastes like.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-marigold text-forest px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold relative z-10"
            >
              <Sprout className="w-4 h-4" />
              Shop Fresh Harvest
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
