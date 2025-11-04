'use client';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function BannerCard() {
  const { t } = useSettings();

  return (
    <Card className="bg-yellow-50 border-yellow-200">
      <CardContent className="p-3 flex items-center justify-between">
        <p className="font-semibold text-yellow-800">
          {t('banner_card_text')}
        </p>
        <Button className="bg-yellow-700 hover:bg-yellow-800 text-white shrink-0">
          {t('banner_card_button')}
          <ArrowRight className="ml-1 w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
