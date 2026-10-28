import { Droplets, Award, TreePine, FlaskConical } from 'lucide-react';
import React from 'react';

/* ─── Timeline Data ─────────────────────────────────────────────────── */
export const TIMELINE = [
  {
    year: '1972',
    title: 'A Seed of Purpose',
    desc: "Patel Sureshbhai inherits 5 acres of red Gujarat soil in Kamana village. He refuses chemical farming from day one — a revolutionary decision in 1972.",
    icon: '🌱',
    side: 'left' as const,
    color: 'bg-sage/15 border-sage/30',
  },
  {
    year: '1985',
    title: 'First Gir Cows Arrive',
    desc: "The farm welcomes its first Gir cows. Their A2 dung becomes the cornerstone of Kamana's Vedic composting system — replacing all chemical inputs.",
    icon: '🐄',
    side: 'right' as const,
    color: 'bg-marigold/10 border-marigold/30',
  },
  {
    year: '1998',
    title: 'Water Conservation System',
    desc: "After a harsh drought, Sureshbhai builds Gujarat's first on-farm rainwater harvesting system, creating the \"Classic Watering\" method still in use today.",
    icon: '💧',
    side: 'left' as const,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    year: '2008',
    title: 'Net-House Innovation',
    desc: 'Son Het designs the first net-house structure — 12,000 sq ft of protected natural growing space. Zero pesticides. Maximum yield. Perfect microclimate.',
    icon: '🏗️',
    side: 'right' as const,
    color: 'bg-forest/5 border-forest/20',
  },
  {
    year: '2011',
    title: 'PGS Natural Certification',
    desc: 'Kamana Farm receives PGS Natural India certification — formally recognising 40 years of chemical-free farming. The first in Kamana village.',
    icon: '🏅',
    side: 'left' as const,
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    year: '2019',
    title: 'Lab Testing Program',
    desc: 'Ansh R. introduces the independent NABL lab testing program. Every harvest batch tested for 80+ residues — published publicly as a transparency commitment.',
    icon: '🔬',
    side: 'right' as const,
    color: 'bg-terracotta/10 border-terracotta/30',
  },
  {
    year: '2023',
    title: 'Pure Khetar Launches',
    desc: "Three generations unite to launch Pure Khetar — bringing Kamana's morning harvest directly to families across Gujarat with guaranteed freshness.",
    icon: '🚀',
    side: 'left' as const,
    color: 'bg-marigold/15 border-marigold/40',
  },
  {
    year: 'Today',
    title: 'Growing Forward',
    desc: 'Expanding net-house capacity to 25,000 sq ft. Introducing new varieties. Partnering with local farmers to spread Vedic natural practices across the region.',
    icon: '🌾',
    side: 'right' as const,
    color: 'bg-forest/8 border-forest/25',
    active: true,
  },
];

/* ─── Milestone pillars ─────────────────────────────────────────────── */
export const MILESTONES = [
  { icon: React.createElement(Droplets, { className: 'w-5 h-5' }), stat: '60%', label: 'Less Water Used', sub: 'vs traditional methods' },
  { icon: React.createElement(Award, { className: 'w-5 h-5' }), stat: '15+', label: 'Certifications', sub: 'over 50 years' },
  { icon: React.createElement(TreePine, { className: 'w-5 h-5' }), stat: '5→15', label: 'Acres Cultivated', sub: 'natural growth' },
  { icon: React.createElement(FlaskConical, { className: 'w-5 h-5' }), stat: '0ppm', label: 'Pesticide Residue', sub: 'in every test' },
];
