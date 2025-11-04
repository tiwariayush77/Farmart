'use client';

import { Search } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import HashtagScroller from '@/components/community/HashtagScroller';
import PollCard from '@/components/community/PollCard';
import BannerCard from '@/components/community/BannerCard';
import ContentCard from '@/components/community/ContentCard';
import { Button } from '@/components/ui/button';

export default function CommunityPage() {
  const { t } = useSettings();
  return (
    <>
      <header className="p-3 bg-background flex items-center justify-between sticky top-0 z-20 border-b">
        <h1 className="text-xl font-bold">{t('nav_community')}</h1>
        <Button variant="ghost" size="icon">
          <Search className="w-6 h-6 text-muted-foreground" />
        </Button>
      </header>
      <div className="p-3 space-y-4">
        <HashtagScroller />
        <PollCard />
        <BannerCard />
        <ContentCard />
      </div>
    </>
  );
}
