'use client';

import {
  Bot,
  Mic,
  BookOpen,
  ScanSearch,
  FlaskConical,
  Bug,
  BarChart,
  Lightbulb,
  Cloudy,
  TrendingUp,
  Landmark,
  AlertTriangle,
  CalendarDays,
  BellRing,
  Phone,
  Newspaper,
  HeartPulse,
  LineChart,
  Target,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VoiceAssistant from '@/components/ai/VoiceAssistant';
import { useSettings } from '@/hooks/useSettings';

export default function AiChatPage() {
  const { t } = useSettings();

  return (
    <div className="flex flex-col min-h-full">
      <header className="p-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground sticky top-0 z-20 shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Bot />
          {t('ai_chat_title')}
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Voice Commands */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mic className="text-primary" /> {t('voice_commands_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {t('voice_command_example')}:
              <span className="font-semibold text-foreground"> &quot;{t('voice_command_example_1')}&quot;</span>,
              <span className="font-semibold text-foreground"> &quot;{t('voice_command_example_2')}&quot;</span>
            </p>
            <div className="flex gap-2">
              <VoiceAssistant>
                <Button className="flex-1">
                  <Mic className="mr-2" />
                  {t('start_voice_chat')}
                </Button>
              </VoiceAssistant>
              <Button variant="outline" className="flex-1">
                <BookOpen className="mr-2" />
                {t('voice_guide')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Smart Scanners */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('smart_scanners_title')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="h-20 flex-col gap-1 text-base">
              <ScanSearch /> {t('scanner_crop_disease')}
            </Button>
            <Button variant="outline" size="lg" className="h-20 flex-col gap-1 text-base">
              <FlaskConical /> {t('scanner_soil_health')}
            </Button>
            <Button variant="outline" size="lg" className="h-20 flex-col gap-1 text-base">
              <Bug /> {t('scanner_pest_id')}
            </Button>
            <Button variant="outline" size="lg" className="h-20 flex-col gap-1 text-base">
              <BarChart /> {t('scanner_nutrient')}
            </Button>
          </CardContent>
        </Card>
        
        {/* AI Recommendations */}
        <Card className="bg-accent border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="text-primary" /> {t('ai_recommendations_title')}
            </CardTitle>
            <p className="text-xs text-muted-foreground pt-1">{t('ai_recommendations_based_on')}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3"><Cloudy className="text-blue-500 mt-0.5"/><span><span className="font-semibold">{t('recommendation_rain_prefix')}</span> {t('recommendation_rain_action')}</span></li>
              <li className="flex items-start gap-3"><TrendingUp className="text-green-500 mt-0.5"/><span><span className="font-semibold">{t('recommendation_market_prefix')}</span> {t('recommendation_market_action')}</span></li>
              <li className="flex items-start gap-3"><Landmark className="text-orange-500 mt-0.5"/><span><span className="font-semibold">{t('recommendation_scheme_prefix')}</span> {t('recommendation_scheme_action')}</span></li>
              <li className="flex items-start gap-3"><AlertTriangle className="text-red-500 mt-0.5"/><span><span className="font-semibold">{t('recommendation_alert_prefix')}</span> {t('recommendation_alert_action')}</span></li>
            </ul>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('quick_actions_title')}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50"> <CalendarDays className="text-primary"/> <span className="text-xs font-medium">{t('action_weather_plan')}</span></div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50"> <BellRing className="text-primary"/> <span className="text-xs font-medium">{t('action_price_alerts')}</span></div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50"> <Phone className="text-primary"/> <span className="text-xs font-medium">{t('action_expert_call')}</span></div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50"> <Landmark className="text-primary"/> <span className="text-xs font-medium">{t('action_scheme_check')}</span></div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50"> <CalendarDays className="text-primary"/> <span className="text-xs font-medium">{t('action_crop_calendar')}</span></div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-muted/50"> <Newspaper className="text-primary"/> <span className="text-xs font-medium">{t('action_market_news')}</span></div>
          </CardContent>
        </Card>

        {/* AI Farm Dashboard */}
        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg">
               <LineChart className="text-primary" /> {t('dashboard_title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-green-100/50 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground">{t('dashboard_farm_health')}</p>
                    <p className="text-lg font-bold text-green-700 flex items-center justify-center gap-1">85% <HeartPulse/></p>
                </div>
                <div className="p-3 bg-green-100/50 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground">{t('dashboard_market_position')}</p>
                    <p className="text-lg font-bold text-green-700 flex items-center justify-center gap-1">Good <TrendingUp/></p>
                </div>
            </div>
             <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                        <Target className="text-primary"/>
                        <div>
                            <p className="font-semibold">{t('dashboard_next_action_title')}</p>
                            <p className="text-muted-foreground">{t('dashboard_next_action_value')}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center bg-muted/50 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                       <ShieldCheck className="text-primary"/>
                        <div>
                           <p className="font-semibold">{t('dashboard_risk_level_title')}</p>
                           <p className="text-muted-foreground">{t('dashboard_risk_level_value')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" className="flex-1">{t('dashboard_view_analysis')}</Button>
                <Button className="flex-1">{t('dashboard_set_reminders')}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Government Schemes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Landmark className="text-primary" /> {t('schemes_title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="bg-primary/10 text-primary p-3 rounded-lg flex justify-between items-center">
                 <p className="font-semibold">{t('schemes_available_text')}</p>
                 <ChevronRight/>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
