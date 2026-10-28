import { Leaf } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { VALUES } from './data';

export function TeamValues() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-widest mb-3">
            <Leaf className="w-3.5 h-3.5" />
            What We Stand For
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest">Our Core Values</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="bg-cream rounded-3xl p-6 border border-sage/10 card-hover h-full">
                <div className={`w-11 h-11 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                  {v.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-forest mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
