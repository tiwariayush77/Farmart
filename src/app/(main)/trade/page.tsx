'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, HelpCircle, Bot } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import AiMarketIntelligenceCard from '@/components/trade/AiMarketIntelligenceCard';
import { Separator } from '@/components/ui/separator';

export default function TradePage() {
  const { t } = useSettings();
  const [activeFilter, setActiveFilter] = useState('crop');

  // Placeholder for when price data is available
  const hasPrices = false;

  return (
    <div>
      <header className="p-3 bg-background flex items-center justify-between sticky top-0 z-20 border-b">
        <h1 className="text-xl font-bold">{t('trade_title')}</h1>
        <Button size="sm">
          <HelpCircle className="w-4 h-4 mr-1.5" /> {t('help_button')}
        </Button>
      </header>

      <div className="p-3 space-y-3">
        {/* Search and Filters */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('search_buyer_placeholder')}
            className="pl-10 h-11"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeFilter === 'crop' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('crop')}
            className="flex-1"
          >
            {t('filter_crop')} <ChevronDown className="ml-1 w-4 h-4" />
          </Button>
          <Button
            variant={activeFilter === 'variety' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('variety')}
            className="flex-1"
          >
            {t('filter_variety')} <ChevronDown className="ml-1 w-4 h-4" />
          </Button>
          <Button
            variant={activeFilter === 'location' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('location')}
            className="flex-1"
          >
            {t('filter_location')} <ChevronDown className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>

      <AiMarketIntelligenceCard />
      
      <Separator className="my-2"/>

      {hasPrices ? (
        <div className="p-3 space-y-3">
          {/* Price cards would be mapped here */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-4">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-lg font-semibold text-foreground">
            {t('no_prices_title')}
          </h2>
          <p className="text-muted-foreground text-sm">
            {t('no_prices_subtitle')}
          </p>
        </div>
      )}
    </div>
  );
}
