import Image from 'next/image';
import Link from 'next/link';
import { Droplets, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function WaterConservationSection() {
  return (
    <section className="bg-forest py-20 lg:py-28 relative overflow-hidden">
      {/* Bg dot pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="text-marigold text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5" />
              Water Conservation
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
              Ancient Wisdom,<br />
              <span className="text-marigold italic">Modern Precision</span>
            </h2>
            <p className="text-cream/75 text-base leading-relaxed mb-8">
              We combine traditional water harvesting techniques with modern drip-irrigation
              to conserve Gujarat&apos;s most precious resource — water. Our closed-loop system
              recycles runoff back to our compost pits.
            </p>
            <Link
              href="/journey"
              className="group inline-flex items-center gap-2 bg-marigold text-forest px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-glow-gold"
            >
              See Our Water Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/farm/classic-watering.jpeg"
                alt="Traditional water conservation at Kamana farm"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
