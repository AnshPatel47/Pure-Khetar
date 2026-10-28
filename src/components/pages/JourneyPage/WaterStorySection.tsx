import Image from 'next/image';
import Link from 'next/link';
import { Droplets, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function WaterStorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-organic-lg">
              <Image
                src="/images/farm/classic-watering.jpeg"
                alt="Classic water conservation at Kamana farm"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 glass-cream rounded-xl px-4 py-2.5 border border-sage/20">
                <p className="text-xs font-bold text-forest">📍 Kamana, Gujarat</p>
                <p className="text-[11px] text-gray-500">Our 1998 water conservation system</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-4">
              <Droplets className="w-3.5 h-3.5" />
              Water Stories
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-5 leading-tight">
              Saving Water,<br />
              <span className="text-terracotta">Season After Season</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              The 1998 drought changed everything. Rather than abandoning natural farming,
              Sureshbhai built a 50,000-litre underground rainwater harvesting tank — fed by
              rooftop channels and farm runoff. That system still waters our crops today.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Combined with precision drip irrigation, we&apos;ve reduced water consumption by 60%
              while increasing soil moisture consistency — meaning healthier, more nutrient-dense
              produce for you.
            </p>
            <Link
              href="/our-farm"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-terracotta transition-colors"
            >
              Explore our farm practices
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
