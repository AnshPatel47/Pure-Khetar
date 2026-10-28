import { Reveal } from '@/components/ui/Reveal';
import { MILESTONES } from './data';

export function MilestonesStrip() {
  return (
    <section className="bg-white border-y border-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.07}>
              <div className="flex items-center gap-3 p-4 rounded-2xl hover:bg-cream transition-colors">
                <div className="w-11 h-11 rounded-xl bg-forest/8 flex items-center justify-center text-forest flex-shrink-0">
                  {m.icon}
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-forest">{m.stat}</p>
                  <p className="text-xs font-semibold text-gray-700">{m.label}</p>
                  <p className="text-[10px] text-gray-400">{m.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
