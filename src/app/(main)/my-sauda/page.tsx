'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import { useSettings } from '@/hooks/useSettings';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Bot } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import LoginSheet from '@/components/auth/LoginSheet';

export default function MySaudaPage() {
  const { t } = useSettings();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);

  return (
    <>
      <header className="p-3 bg-background flex items-center justify-between sticky top-0 z-20 border-b">
        <h1 className="text-xl font-bold">{t('nav_sauda')}</h1>
      </header>

      <div className="p-3 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('search_sauda_placeholder')}
            className="pl-10 h-11"
          />
        </div>

        <Tabs defaultValue="open">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="open">{t('open_saudas')}</TabsTrigger>
            <TabsTrigger value="closed">{t('closed_saudas')}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 justify-between">
            {t('all_saudas')} <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="flex-1 justify-between">
            {t('date_filter')} <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center text-center p-8 mt-8">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-lg font-semibold text-foreground">
            {t('no_sauda_found')}
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-4">
            {t('login_to_view_saudas')}
          </p>
          <LoginSheet
            open={isLoginSheetOpen}
            onOpenChange={setIsLoginSheetOpen}
          >
            <Button onClick={() => setIsLoginSheetOpen(true)}>{t('login_now_button')}</Button>
          </LoginSheet>
        </div>
      ) : (
        <div>{/* Sauda list will go here */}</div>
      )}
    </>
  );
}
