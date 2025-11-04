
"use client";

import { useEffect, useState } from "react";
import { getSmartNotifications, type SmartNotificationsOutput } from "@/ai/flows/smart-notifications-for-farmers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CloudSun, TrendingUp, Lightbulb, Loader2 } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function SmartNotificationsCard() {
  const { t } = useSettings();
  const [notifications, setNotifications] = useState<SmartNotificationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getFallbackNotifications = (): SmartNotificationsOutput => ({
    weatherUpdate: t('weather_update'),
    marketTrends: t('market_trends'),
    farmingTips: t('farming_tips'),
    aiSuggestion: {
      heading: t('ai_smart_suggestion_heading'),
      advice: t('ai_smart_suggestion_advice').split(' AI Prediction:')[0],
      prediction: 'AI Prediction:' + t('ai_smart_suggestion_advice').split(' AI Prediction:')[1],
    },
  });

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setIsLoading(true);
        const data = await getSmartNotifications({ location: "Indore, MADHYA PRADESH" });
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch smart notifications:", error);
        setNotifications(getFallbackNotifications());
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotifications();
  }, [t]);

  if (isLoading) {
    return (
        <Card className="mx-3 mb-4">
            <CardHeader>
                <CardTitle>{t('smart_notifications')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-24 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <p className="text-muted-foreground">{t('loading_notifications')}</p>
                </div>
            </CardContent>
        </Card>
    )
  }

  if (!notifications) {
    return null; // Or show an error state
  }
  
  return (
    <Card className="mx-3 mb-4">
      <CardHeader>
        <CardTitle>{t('smart_notifications')}</CardTitle>
        <CardDescription>Personalized for {t('location')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <CloudSun className="w-5 h-5 text-primary" />
            {t('weather_update')}
          </h3>
          <p className="text-muted-foreground">{notifications.weatherUpdate}</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t('market_trends')}
          </h3>
          <p className="text-muted-foreground">{notifications.marketTrends}</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <Lightbulb className="w-5 h-5 text-primary" />
            {t('farming_tips')}
          </h3>
          <p className="text-muted-foreground">{notifications.farmingTips}</p>
        </div>
      </CardContent>
    </Card>
  );
}
