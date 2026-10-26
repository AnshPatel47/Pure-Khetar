export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  since?: string;
  role_detail: string;
  specialties: string[];
  image: string | null;
  accent: string;
  iconBg: string;
  badgeColor: string;
}

export const TEAM: TeamMember[] = [
  {
    id: 'sureshbhai',
    name: 'Patel Sureshbhai',
    role: 'Head of Traditional Farming',
    tagline: 'Fifty years of learning from the same soil.',
    bio: 'Sureshbhai has spent over 50 years farming in Kamana. His experience with the soil, the seasons and traditional methods is the foundation of everything we grow at Pure Khetar.',
    since: '1972',
    role_detail: '50+ Years of Kheti',
    specialties: ['Traditional farming', 'Soil care', 'Crop seasons'],
    image: null,
    accent: 'from-forest to-forest-l',
    iconBg: 'bg-forest/10',
    badgeColor: 'bg-marigold text-forest',
  },
  {
    id: 'het',
    name: 'Patel Het Sureshbhai',
    role: 'Founder',
    tagline: 'Taking our family farm straight to your kitchen.',
    bio: 'Het founded Pure Khetar to bring his father’s farm-grown vegetables directly to customers — fresh from the field, without the long chain in between.',
    role_detail: 'Founder',
    specialties: ['Vision', 'Operations', 'Customer relations'],
    image: null,
    accent: 'from-sage to-forest',
    iconBg: 'bg-sage/10',
    badgeColor: 'bg-sage/20 text-forest',
  },
  {
    id: 'ansh',
    name: 'Patel Ansh R',
    role: 'Technology Partner',
    tagline: 'Building the bridge between the farm and your screen.',
    bio: 'Ansh builds and maintains the Pure Khetar website and looks after the technical side of the business.',
    role_detail: 'Web & Technology',
    specialties: ['Web development', 'Technology'],
    image: null,
    accent: 'from-terracotta to-marigold',
    iconBg: 'bg-terracotta/10',
    badgeColor: 'bg-terracotta/15 text-terracotta',
  },
];
