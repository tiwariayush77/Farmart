'use client';
import { useSettings } from '@/hooks/useSettings';

export default function HashtagScroller() {
  const { t } = useSettings();

  const hashtags = [
    { key: 'hashtag_tazakhabar', label: '#TazaKhabar' },
    { key: 'hashtag_niyam', label: '#Niyam' },
    { key: 'hashtag_fasle', label: '#Fasle' },
    { key: 'hashtag_utarchadhav', label: '#UtarChadhav' },
    { key: 'hashtag_rak', label: '#Rak' },
    { key: 'hashtag_mandi', label: '#Mandi' },
    { key: 'hashtag_weather', label: '#Weather' },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 -mx-3 px-3">
      {hashtags.map((tag) => (
        <button
          key={tag.key}
          className="whitespace-nowrap bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
        >
          {t(tag.key as any)}
        </button>
      ))}
    </div>
  );
}
