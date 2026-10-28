import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CERTS } from './data';

export function LabCertificationsSection() {
  return (
    <section id="lab-reports" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionHeading
            eyebrow="Transparency & Trust"
            title={<>Every Claim,<br /><span className="text-terracotta">Lab Verified</span></>}
            subtitle="We believe transparency is non-negotiable. Every batch of produce is sent to NABL-accredited labs before it reaches your kitchen."
            center
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <div className="bg-white rounded-3xl p-6 border border-sage/15 shadow-card text-center card-hover group">
                <div className="w-14 h-14 bg-forest/8 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-forest group-hover:text-cream transition-colors">
                  <Award className="w-7 h-7 text-forest group-hover:text-cream transition-colors" />
                </div>
                <h3 className="font-serif text-base font-bold text-forest">{c.label}</h3>
                <p className="text-xs text-sage font-medium mt-1">{c.year}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-forest/30 text-forest px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-forest hover:text-cream transition-all duration-300"
            >
              Request Full Lab Reports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
