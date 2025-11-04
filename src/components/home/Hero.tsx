"use client";

import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { t } = useSettings();
  return (
    <div className="px-3 pb-4">
      <div className="relative rounded-lg p-4 flex items-center justify-between overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="space-y-2 z-10">
          <h2 className="text-lg font-bold">{t('hero_title')}</h2>
          <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
            {t('hero_cta')} <ArrowRight className="ml-2 w-4 h-4"/>
          </Button>
        </div>
        <div className="absolute -right-4 -bottom-4 text-7xl opacity-30 z-0 select-none">
          💰
        </div>
      </div>
    </div>
  );
}
