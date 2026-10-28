import { Wind, Droplets, Sun, TreePine, FlaskConical, Award } from 'lucide-react';
import React from 'react';

/* ─── Feature Grid Data ─────────────────────────────────────────────── */
export const FEATURES = [
  {
    icon: React.createElement(Wind, { className: 'w-5 h-5' }),
    title: 'Net-House Microclimate',
    desc: 'Our 12,000 sq ft net-houses create the ideal controlled environment — protecting crops from harsh Gujarat sun and pests without any chemicals.',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: React.createElement(Droplets, { className: 'w-5 h-5' }),
    title: 'Drip Water Conservation',
    desc: 'Using precision drip irrigation, we conserve 60% more water than traditional flood irrigation, while delivering nutrients directly to roots.',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    icon: React.createElement(Sun, { className: 'w-5 h-5' }),
    title: 'Vedic A2 Manure',
    desc: 'Gir Cow A2 dung compost enriches our soil with natural probiotics, replacing synthetic fertilizers entirely — a 50-year tradition.',
    color: 'bg-marigold/10 text-marigold',
  },
  {
    icon: React.createElement(TreePine, { className: 'w-5 h-5' }),
    title: 'Biodiversity Preservation',
    desc: 'We intercrop with local herbs and maintain pollinator gardens, naturally deterring pests while building rich, living soil ecosystems.',
    color: 'bg-forest/8 text-forest',
  },
  {
    icon: React.createElement(FlaskConical, { className: 'w-5 h-5' }),
    title: 'Independent Lab Testing',
    desc: 'Every batch is tested at NABL-accredited labs for 80+ pesticide residues. Reports are publicly available — zero secrets, zero shortcuts.',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: React.createElement(Award, { className: 'w-5 h-5' }),
    title: 'PGS Natural Certified',
    desc: "Certified under India's Participatory Guarantee System — the gold standard in grassroots natural certification since 2011.",
    color: 'bg-emerald-50 text-emerald-600',
  },
];

/* ─── Certification Badges ─────────────────────────────────────────── */
export const CERTS = [
  { label: 'PGS Natural India', year: '2011–Present' },
  { label: 'NABL Lab Tested', year: 'Every Harvest' },
  { label: 'Zero Pesticide', year: 'Batch Verified' },
  { label: 'A2 Vedic Certified', year: 'Gir Cow Manure' },
];
