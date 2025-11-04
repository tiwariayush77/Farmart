'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/hooks/useSettings';
import { Globe, Check } from 'lucide-react';
import { Language, languages } from '@/lib/translations';

export default function LanguageSheet() {
  const { language, setLanguage, t } = useSettings();
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="w-6 h-6 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader>
          <SheetTitle className="text-center text-xl font-bold">
            भाषा चुनें | Choose Language
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          {languages.map(lang => (
            <Button
              key={lang.code}
              variant={language === lang.code ? 'default' : 'outline'}
              className="h-14 text-base flex justify-between items-center"
              onClick={() => handleLanguageChange(lang.code as Language)}
            >
              <div>
                <p className="font-semibold">{lang.nativeName}</p>
                <p className="text-sm font-normal text-muted-foreground">{lang.name}</p>
              </div>
              {language === lang.code && <Check className="w-5 h-5" />}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
