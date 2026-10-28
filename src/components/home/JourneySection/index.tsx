'use client';

import { JourneyImage } from './JourneyImage';
import { JourneyContent } from './JourneyContent';

export function JourneySection() {
  return (
    <section className="bg-forest relative overflow-hidden py-20 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #E0A528 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <JourneyImage />
          <JourneyContent />
        </div>
      </div>
    </section>
  );
}
