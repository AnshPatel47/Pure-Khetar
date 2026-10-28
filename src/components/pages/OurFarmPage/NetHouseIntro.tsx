import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STATS = [
  { num: '12,000', unit: 'sq ft', label: 'Net-House Coverage' },
  { num: '0', unit: 'pesticides', label: 'Used in Farming' },
  { num: '60%', unit: 'less water', label: 'vs Flood Irrigation' },
  { num: '365', unit: 'days', label: 'Active Cultivation' },
];

export function NetHouseIntro() {
  return (
    <section id="nethouse" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Net-House Farming"
            title={<>Controlled Purity,<br /><span className="text-terracotta">Open Skies</span></>}
            subtitle="Our patented net-house structure covers 12,000 sq ft, creating a micro-environment that eliminates the need for pesticides while letting natural sunlight and Gujarat's breeze do their work."
          />
          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.map(({ num, unit, label }) => (
              <div key={label} className="bg-white rounded-2xl p-4 border border-sage/15 shadow-card">
                <p className="font-serif text-2xl font-bold text-forest">
                  {num} <span className="text-sm font-normal text-sage">{unit}</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-organic-lg">
              <Image
                src="/images/farm/nethouse-farming.jpeg"
                alt="Net-house farming at Kamana farm"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 via-transparent to-transparent" />
            </div>
            {/* Floating label */}
            <div className="absolute -bottom-5 -right-5 glass-cream rounded-2xl p-4 shadow-card flex items-center gap-3 border border-sage/20">
              <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-forest" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Certified Since</p>
                <p className="text-sm font-bold text-forest">2011 PGS Certification</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
