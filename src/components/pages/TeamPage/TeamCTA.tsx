import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function TeamCTA() {
  return (
    <section className="py-16 bg-cream-dk">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="bg-forest rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'radial-gradient(circle at 3px 3px, #E0A528 1px, transparent 0)',
                backgroundSize: '28px 28px',
              }}
            />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4 relative z-10">
              Grow With Us
            </h2>
            <p className="text-cream/70 mb-8 relative z-10 max-w-lg mx-auto">
              Questions about our practices? Want to visit the farm?
              We love meeting the families we feed — reach out anytime.
            </p>
            <div className="flex flex-wrap gap-3 justify-center relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-marigold text-forest px-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold"
              >
                <Mail className="w-4 h-4" />
                Contact the Team
              </Link>
              <Link
                href="/our-farm"
                className="inline-flex items-center gap-2 glass border border-white/30 text-cream px-7 py-4 rounded-full font-bold text-sm hover:bg-white/15 transition-colors"
              >
                Visit Our Farm
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
