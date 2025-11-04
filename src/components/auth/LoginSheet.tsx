'use client';

import { useState, type ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSettings } from '@/hooks/useSettings';
import { useToast } from '@/hooks/use-toast';

export default function LoginSheet({
  children,
  open,
  onOpenChange,
}: {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useSettings();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Basic phone number validation
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast({
        variant: 'destructive',
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit mobile number.',
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast({
      title: 'OTP Sent',
      description: `An OTP has been sent to ${phoneNumber}.`,
    });
    // In a real app, you would proceed to an OTP screen
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-lg">
        <SheetHeader className="text-left">
          <SheetTitle className="text-xl font-bold">{t('login_now_heading')}</SheetTitle>
          <SheetDescription>
            {t('login_now_subheading')}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-muted-foreground sm:text-sm">+91</span>
            </div>
            <Input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder={t('phone_number_placeholder')}
              className="pl-10 h-12 text-base"
              disabled={isLoading}
            />
          </div>
        </div>
        <SheetFooter className="flex flex-col gap-4">
          <p className="text-xs text-muted-foreground text-center">
            {t('terms_prefix')}
            <a href="#" className="text-primary underline">
              {t('privacy_policy')}
            </a>
            {' '}&{' '}
            <a href="#" className="text-primary underline">
              {t('terms_and_conditions')}
            </a>
          </p>
          <Button onClick={handleLogin} disabled={isLoading || phoneNumber.length !== 10} className="w-full h-12 text-base">
            {isLoading ? t('proceeding_button') : t('proceed_button')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
