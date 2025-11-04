'use client';
import { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function PollCard() {
  const { t } = useSettings();
  const [voted, setVoted] = useState(false);

  const pollOptions = [
    { id: 'opt1', label: '10-12%' },
    { id: 'opt2', label: '15-18%' },
    { id: 'opt3', label: '20-24%' },
    { id: 'opt4', label: '30%+' },
  ];

  return (
    <div className="rounded-lg p-4 text-white bg-gradient-to-r from-primary to-secondary">
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl opacity-50">🌾</span>
        <h2 className="font-bold">{t('poll_of_the_day')}</h2>
        <span className="text-2xl opacity-50">🌾</span>
      </div>
      <p className="text-center text-xs opacity-90 mb-3">
        ⚡ {t('poll_closes_in')}
      </p>

      <Card className="text-card-foreground">
        <CardContent className="p-4">
          <p className="font-semibold text-center mb-4">
            {t('poll_question')}
          </p>
          <RadioGroup
            defaultValue="opt2"
            className="space-y-2"
            onValueChange={() => setVoted(true)}
          >
            {pollOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-2 rounded-md border p-3"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
      <p className="text-center text-xs mt-3">
        {voted ? t('poll_votes_so_far', { count: 358 }) : t('poll_votes_so_far', { count: 357 })}
      </p>
    </div>
  );
}
