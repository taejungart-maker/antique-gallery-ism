import { motion } from 'motion/react';
import { Edit, Trash2, Plus } from 'lucide-react';
import type { AntiqueItem } from './TimelineItem';
import { useLanguage } from './LanguageContext';

interface AdminPanelProps {
  isAdmin: boolean;
  onAddItem: () => void;
}

export function AdminPanel({ isAdmin, onAddItem }: AdminPanelProps) {
  const { t } = useLanguage();
  
  if (!isAdmin) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-0 left-0 right-0 bg-accent text-accent-foreground shadow-lg z-50"
    >
      <div className="container mx-auto px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h3 
              className="text-lg sm:text-xl"
              style={{ fontFamily: "'Noto Serif KR', serif" }}
            >
              {t('adminMode')}
            </h3>
            <span 
              className="text-xs sm:text-sm opacity-80"
              style={{ fontFamily: 'Pretendard, sans-serif' }}
            >
              {t('adminDesc')}
            </span>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={onAddItem}
              className="px-3 sm:px-4 py-2 bg-accent-foreground/10 hover:bg-accent-foreground/20 rounded-sm transition-colors flex items-center gap-2 text-sm flex-1 sm:flex-initial justify-center"
            >
              <Plus className="w-4 h-4" />
              <span style={{ fontFamily: 'Pretendard, sans-serif' }}>{t('newItem')}</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}