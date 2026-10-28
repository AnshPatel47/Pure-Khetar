import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FEATURES } from './data';

export function FarmPracticesGrid() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionHeading
            eyebrow="Our Practices"
            title={<>What Makes Kamana<br /><span className="text-terracotta">Naturally Grown</span></>}
            center
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="group bg-cream rounded-3xl p-6 border border-sage/10 card-hover h-full">
                <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-5`}>
                  {f.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-forest mb-2 group-hover:text-terracotta transition-colors">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
