'use client';

import { Camera, Video } from 'lucide-react';
import { FARM_PHOTOS, FARM_VIDEOS } from '@/data/farm';

type Tab = 'all' | 'photos' | 'videos';

interface GalleryTabsProps {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  totalCount: number;
}

export function GalleryTabs({ tab, onTabChange, totalCount }: GalleryTabsProps) {
  const tabs = [
    { id: 'all' as const, label: `All (${totalCount})` },
    { id: 'photos' as const, label: `Photos (${FARM_PHOTOS.length})`, Icon: Camera },
    { id: 'videos' as const, label: `Videos (${FARM_VIDEOS.length})`, Icon: Video },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
            tab === id
              ? 'bg-forest text-cream shadow-natural'
              : 'border border-sage/25 bg-white text-forest/70 hover:border-forest/30 hover:text-forest'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export type { Tab };
