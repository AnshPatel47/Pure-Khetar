'use client';

import { QualityImage } from './QualityImage';
import { QualityContent } from './QualityContent';

export function QualitySection() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <QualityImage />
          <QualityContent />
        </div>
      </div>
    </section>
  );
}
