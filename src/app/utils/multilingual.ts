import type { AntiqueItem } from '@/app/components/TimelineItem';

export function getLocalizedTitle(item: AntiqueItem, language: 'ko' | 'zh' | 'en'): string {
  if (language === 'ko' && item.title_ko) return item.title_ko;
  if (language === 'zh' && item.title_zh) return item.title_zh;
  if (language === 'en' && item.title_en) return item.title_en;
  return item.title; // 기본값
}

export function getLocalizedDescription(item: AntiqueItem, language: 'ko' | 'zh' | 'en'): string {
  if (language === 'ko' && item.description_ko) return item.description_ko;
  if (language === 'zh' && item.description_zh) return item.description_zh;
  if (language === 'en' && item.description_en) return item.description_en;
  return item.description; // 기본값
}
