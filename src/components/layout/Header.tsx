"use client";

import { MapPin, Mic, UserCircle, ChevronDown, Globe } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import VoiceAssistant from "@/components/ai/VoiceAssistant";
import LanguageSheet from "@/components/layout/LanguageSheet";

export default function Header() {
  const { t } = useSettings();

  return (
    <header className="p-3 bg-background flex items-center gap-2 sticky top-0 z-20 border-b">
      <div className="flex-1 flex flex-col items-start">
          <Button variant="ghost" className="h-auto p-0 flex items-center gap-1 text-sm font-semibold">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t('location')}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        <p className="text-xs text-muted-foreground ml-1">
          <span role="img" aria-label="weather">🌤️</span> 28°C, {t('weather_status')}
        </p>
      </div>
      
      <VoiceAssistant>
        <Button variant="outline" className="h-auto py-1 px-3 flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary/10">
          <Mic className="w-4 h-4" />
          <span className="text-sm font-medium">{t('voice_prompt')}</span>
        </Button>
      </VoiceAssistant>

      <LanguageSheet />

      <Button variant="ghost" size="icon" className="rounded-full">
        <UserCircle className="w-8 h-8 text-muted-foreground" />
      </Button>
    </header>
  );
}
