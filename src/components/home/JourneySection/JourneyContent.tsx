import Link from 'next/link';
import { Sprout, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

export function JourneyContent() {
  return (
    <Reveal delay={0.15}>
      <p className="inline-flex items-center gap-1.5 text-xs font-bold text-marigold uppercase tracking-widest mb-4">
        <Sprout className="w-3.5 h-3.5" /> Our Story
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest leading-tight mb-5">
        Three Generations.<br /><span className="text-terracotta italic">One Unbreakable Promise.</span>
      </h2>
      <p className="text-forest/70 leading-relaxed text-base mb-5">
        Since 1972, our family has cultivated Kamana&apos;s red soil using only Vedic practices. No shortcuts. No chemicals. Just the same seeds, the same sunrises, and the same love for the land that sustained generations before us.
      </p>
      <p className="text-forest/70 leading-relaxed text-base mb-8">
        Today, Het&apos;s net-house engineering and Ansh&apos;s direct-to-consumer vision bring that same tradition straight to your kitchen — faster and fresher than ever.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/journey" className="group inline-flex items-center gap-2 bg-marigold text-forest px-6 py-3.5 rounded-full font-bold text-sm hover:bg-forest hover:text-cream transition-colors shadow-glow-gold">
          Read Our Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link href="/our-farm" className="inline-flex items-center gap-2 border border-forest/30 text-forest px-6 py-3.5 rounded-full font-bold text-sm hover:bg-forest hover:text-cream transition-colors">
          Explore Our Farm
        </Link>
      </div>
    </Reveal>
  );
}

