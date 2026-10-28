import { Leaf, Award, Heart, TreePine } from 'lucide-react';
import React from 'react';

export const VALUES = [
  {
    icon: React.createElement(Leaf, { className: 'w-5 h-5' }),
    title: 'Zero Compromise',
    desc: 'Not a single chemical has touched Kamana soil in 50+ years. That commitment is non-negotiable.',
    color: 'bg-sage/10 text-sage',
  },
  {
    icon: React.createElement(Award, { className: 'w-5 h-5' }),
    title: 'Full Transparency',
    desc: 'Every lab report is public. Every practice is documented. We have nothing to hide — and everything to share.',
    color: 'bg-marigold/10 text-marigold',
  },
  {
    icon: React.createElement(Heart, { className: 'w-5 h-5' }),
    title: 'Family First',
    desc: 'Pure Khetar is a family farm, not a corporation. When you buy from us, you support three generations directly.',
    color: 'bg-terracotta/10 text-terracotta',
  },
  {
    icon: React.createElement(TreePine, { className: 'w-5 h-5' }),
    title: 'Living Soil Promise',
    desc: 'We leave every acre richer than we found it — for the next generation of Patels and for the planet.',
    color: 'bg-forest/8 text-forest',
  },
];
