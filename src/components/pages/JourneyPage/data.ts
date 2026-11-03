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
    title: 'First Farm Cows Arrive',
    desc: "The farm welcomes its first cows. Their dung becomes the cornerstone of Kamana's Vedic composting system — replacing all chemical inputs.",
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
    title: 'Tradition Meets Today',
    desc: 'Kamana Farm continues four decades of pesticide-free farming with careful, hands-on cultivation for the village community.',
    icon: '🏅',
    side: 'left' as const,
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    year: '2019',
    title: 'Stronger Farm Standards',
    desc: 'Ansh R. introduces careful harvest inspections and transparent growing practices across the farm for consistent freshness.',
    icon: '🔬',
    side: 'right' as const,
    color: 'bg-terracotta/10 border-terracotta/30',
  },
  {
    year: '2026',
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
  { icon: React.createElement(Award, { className: 'w-5 h-5' }), stat: '50+', label: 'Years of Farming', sub: 'across generations' },
  { icon: React.createElement(TreePine, { className: 'w-5 h-5' }), stat: '5→15', label: 'Acres Cultivated', sub: 'steady growth' },
  { icon: React.createElement(FlaskConical, { className: 'w-5 h-5' }), stat: '0', label: 'Synthetic Pesticides', sub: 'used in growing' },
];
