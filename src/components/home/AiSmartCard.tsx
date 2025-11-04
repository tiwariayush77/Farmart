
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { getSmartNotifications, type SmartNotificationsOutput } from "@/ai/flows/smart-notifications-for-farmers";
import { Skeleton } from "../ui/skeleton";

export default function AiSmartCard() {
  const { t, language } = useSettings();
  const [suggestion, setSuggestion] = useState<SmartNotificationsOutput['aiSuggestion'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestion() {
      try {
        setIsLoading(true);
        const data = await getSmartNotifications({ location: "Indore, MADHYA PRADESH" });
        if (data.aiSuggestion) {
          setSuggestion(data.aiSuggestion);
        } else {
            // Fallback content if AI doesn't return suggestion
            setSuggestion({
                heading: t('ai_smart_suggestion_heading'),
                advice: t('ai_smart_suggestion_advice').split(' AI Prediction:')[0],
                prediction: 'AI Prediction:' + t('ai_smart_suggestion_advice').split(' AI Prediction:')[1],
            })
        }
      } catch (error) {
        console.error("Failed to fetch AI suggestion:", error);
         // Fallback content on error
        setSuggestion({
            heading: t('ai_smart_suggestion_heading'),
            advice: t('ai_smart_suggestion_advice').split(' AI Prediction:')[0],
            prediction: 'AI Prediction:' + t('ai_smart_suggestion_advice').split(' AI Prediction:')[1],
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSuggestion();
  }, [t]);

  if (isLoading) {
    return (
        <div className="px-3 pb-4">
            <div className="relative rounded-lg p-4 flex flex-col items-start justify-between overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <Skeleton className="h-6 w-48 mb-2 bg-white/30" />
                <Skeleton className="h-4 w-full mb-1 bg-white/30" />
                <Skeleton className="h-4 w-3/4 mb-4 bg-white/30" />
                <div className="flex gap-2 w-full">
                    <Skeleton className="h-9 flex-1 bg-white/30" />
                    <Skeleton className="h-9 flex-1 bg-white/30" />
                    <Skeleton className="h-9 flex-1 bg-white/30" />
                </div>
            </div>
        </div>
    );
  }

  if (!suggestion) return null;

  const suggestionInCurrentLang = {
    heading: language === 'hi' ? suggestion.heading : t('ai_smart_suggestion_heading'),
    advice: language === 'hi' ? suggestion.advice : t('ai_smart_suggestion_advice').split(' AI Prediction:')[0],
    prediction: language === 'hi' ? suggestion.prediction : 'AI Prediction:' + t('ai_smart_suggestion_advice').split(' AI Prediction:')[1],
  }


  return (
    <div className="px-3 pb-4">
      <div className="relative rounded-lg p-4 flex flex-col items-start justify-between overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="space-y-2 z-10 w-full">
          <h2 className="text-lg font-bold">{suggestionInCurrentLang.heading}</h2>
          <p className="text-sm">
            {suggestionInCurrentLang.advice} <span className="opacity-80 font-medium">{suggestionInCurrentLang.prediction}</span>
          </p>
          <div className="flex gap-2 pt-2 w-full">
            <Button variant="secondary" size="sm" className="flex-1 bg-white/20 text-white hover:bg-white/30">
              {t('ai_scan_crop')}
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 bg-white/20 text-white hover:bg-white/30">
              {t('ai_price_trends')}
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 bg-white/20 text-white hover:bg-white/30">
              {t('ai_weather_plan')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
