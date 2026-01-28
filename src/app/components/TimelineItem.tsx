import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';

export interface AntiqueItem {
  id: string;
  year: number;
  title: string;
  titleZh?: string;
  titleEn?: string;
  description: string;
  descriptionZh?: string;
  descriptionEn?: string;
  period: string;
  imageUrl: string;
  image2Url?: string;
  image3Url?: string;
  image4Url?: string;
  yearStart?: string;
  yearEnd?: string;
  size?: string;
}

interface TimelineItemProps {
  item: AntiqueItem;
  onShowCertificate: (item: AntiqueItem) => void;
}

export function TimelineItem({ item, onShowCertificate }: TimelineItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-shrink-0 w-full sm:w-[350px] md:w-[400px] mx-4 sm:mx-6 md:mx-8"
    >
      <div className="relative group cursor-pointer" onClick={() => onShowCertificate(item)}>
        <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          <motion.img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </motion.div>
  );
}