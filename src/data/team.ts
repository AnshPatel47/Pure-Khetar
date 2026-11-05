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
  phone: string | null;
}

export const TEAM: TeamMember[] = [
  {
    id: 'sureshbhai',
    name: 'Sureshbhai Patel',
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
    phone: null,
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
    phone: '8320019977',
  },
  {
    id: 'ansh',
    name: 'Patel Ansh Rohitkumar',
    role: 'Technology Partner',
    tagline: 'Building the bridge between the farm and your screen.',
    bio: 'Ansh builds and maintains the Pure Khetar website and looks after the technical side of the business.',
    role_detail: 'Web & Technology',
    specialties: ['Web development', 'Technology'],
    image: null,
    accent: 'from-terracotta to-marigold',
    iconBg: 'bg-terracotta/10',
    badgeColor: 'bg-terracotta/15 text-terracotta',
    phone: '7990890292',
  },
  {
    id: 'khushi',
    name: 'Khushi Patel',
    role: 'Co-Founder · Technology',
    tagline: 'Growing the digital experience with the care of the farm.',
    bio: 'Khushi supports Pure Khetar as Co-Founder and Technology Partner, helping create a smooth farm-to-home experience for customers.',
    role_detail: 'Co-Founder · Tech',
    specialties: ['Technology', 'Customer experience', 'Operations'],
    image: null,
    accent: 'from-sage to-marigold',
    iconBg: 'bg-marigold/10',
    badgeColor: 'bg-marigold text-forest',
    phone: '8156091523',
  },
];
