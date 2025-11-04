'use client';
import Image from 'next/image';
import { useSettings } from '@/hooks/useSettings';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images';

export default function ContentCard() {
  const { t } = useSettings();
  const contentImage = placeholderImages.find(p => p.id === 'content-wheat');

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">₹</AvatarFallback>
        </Avatar>
        <div className='w-full'>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Bazaar Halchal ✅</p>
            <p className="text-xs text-muted-foreground">1 hr ago</p>
          </div>
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded">
            #UtarChadhav
          </span>
        </div>
      </CardHeader>
      <CardContent className='pt-0'>
        <p className="font-semibold mb-2">{t('content_card_title')}</p>
        <p className="text-sm text-muted-foreground mb-3">
          {t('content_card_excerpt')}...
          <a href="#" className="text-primary font-medium ml-1">{t('read_more')}</a>
        </p>
        {contentImage && (
            <div className="aspect-video rounded-lg overflow-hidden relative">
                <Image
                    src={contentImage.imageUrl}
                    alt={contentImage.description}
                    data-ai-hint={contentImage.imageHint}
                    fill
                    className="object-cover"
                />
            </div>
        )}
      </CardContent>
    </Card>
  );
}
