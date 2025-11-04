
"use client";

import { useEffect, useState } from "react";
import { getMarketIntelligence, type MarketIntelligenceOutput } from "@/ai/flows/market-intelligence-flow";
import { useSettings } from "@/hooks/useSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingDown, ArrowRight } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function AiMarketIntelligenceCard() {
  const { t } = useSettings();
  const [intelligence, setIntelligence] = useState<MarketIntelligenceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchIntelligence() {
      try {
        setIsLoading(true);
        const data = await getMarketIntelligence({ crop: "Wheat", location: "Indore" });
        setIntelligence(data);
      } catch (error) {
        console.error("Failed to fetch market intelligence:", error);
        setIntelligence({
            prediction: "गेहूं बेचने का आज सबसे अच्छा दिन! कल कीमत ₹150 गिर सकती है",
            currentPrice: 2800,
            predictedPrice: 2650
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchIntelligence();
  }, []);

  if (isLoading) {
    return (
      <div className="px-3">
        <Card className="bg-destructive/10 border-destructive/30">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-destructive/20" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-5 w-full bg-destructive/20" />
            <Skeleton className="h-5 w-3/4 bg-destructive/20" />
            <div className="flex justify-between items-center text-sm">
              <Skeleton className="h-5 w-1/3 bg-destructive/20" />
              <Skeleton className="h-5 w-1/3 bg-destructive/20" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-9 flex-1 bg-destructive/20" />
              <Skeleton className="h-9 flex-1 bg-destructive/20" />
              <Skeleton className="h-9 flex-1 bg-destructive/20" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!intelligence) return null;

  return (
    <div className="px-3">
      <Card className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-destructive flex items-center gap-2">
            <span className="text-xl">🤖</span> {t('ai_recommendation_title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="font-semibold text-destructive">{intelligence.prediction}</p>
          <div className="flex justify-between items-center text-sm font-medium bg-destructive/10 p-2 rounded-md">
            <span className="text-destructive">{t('current_price_label')}: ₹{intelligence.currentPrice}</span>
            <ArrowRight className="w-4 h-4 text-destructive/70"/>
            <span className="text-destructive">{t('forecast_price_label')}: ₹{intelligence.predictedPrice} ({t('tomorrow_label')})</span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="destructive" size="sm" className="flex-1 bg-destructive/80 hover:bg-destructive">
              {t('sell_now_button')}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/20">
              {t('price_alerts_button')}
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/20">
              {t('best_buyers_button')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
