import { motion, AnimatePresence } from 'motion/react';
import { Plus, FolderOpen } from 'lucide-react';
import { ArchiveCard, type ArchiveItem } from './ArchiveCard';
import Masonry from 'react-responsive-masonry';
import { useLanguage } from './LanguageContext';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '@/utils/supabase/info';

// VERSION: 2.0 - Removed reset archive button
interface ArchivePageProps {
  items: ArchiveItem[];
  onAddItem: () => void;
  onEditItem: (item: ArchiveItem) => void;
  onDeleteItem: (id: string) => void;
  isLoggedIn: boolean;
  onResetArchive?: () => void;
}

export function ArchivePage({ items, onAddItem, onEditItem, onDeleteItem, isLoggedIn, onResetArchive }: ArchivePageProps) {
  const { language } = useLanguage();

  const t = {
    ko: {
      archive: '아카이브',
      collectorStudy: '컬렉터의 서재',
      emptyState: '아직 저장된 항목이 없습니다',
      emptyDescription: '영감을 주는 이미지나 링크를 저장하여 나만의 컬렉션을 만들어보세요',
      addFirst: '첫 항목 추가하기',
      addItem: '항목 추가',
      resetArchive: '아카이브 초기화',
    },
    zh: {
      archive: '档案',
      collectorStudy: '收藏家的书房',
      emptyState: '尚未保存任何项目',
      emptyDescription: '保存灵感图片或链接，创建您的个人收藏',
      addFirst: '添加第一项',
      addItem: '添加项目',
      resetArchive: '重置档案',
    },
    en: {
      archive: 'Archive',
      collectorStudy: "Collector's Study",
      emptyState: 'No items saved yet',
      emptyDescription: 'Save inspiring images or links to create your personal collection',
      addFirst: 'Add First Item',
      addItem: 'Add Item',
      resetArchive: 'Reset Archive',
    },
  };

  const texts = t[language as keyof typeof t] || t.en;

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl mb-3"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              color: '#1a3a3a'
            }}
          >
            {texts.archive}
          </h1>
          <p
            className="text-lg text-gray-600"
            style={{ fontFamily: 'Pretendard, sans-serif' }}
          >
            {texts.collectorStudy}
          </p>
        </motion.div>

        {/* Empty State */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-20"
          >
            <div
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(165, 235, 250, 0.2)',
                border: '2px dashed rgba(165, 235, 250, 0.5)',
              }}
            >
              <FolderOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3
              className="text-xl mb-3"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                color: '#1a3a3a'
              }}
            >
              {texts.emptyState}
            </h3>
            <p
              className="text-gray-600 mb-8"
              style={{ fontFamily: 'Pretendard, sans-serif' }}
            >
              {texts.emptyDescription}
            </p>
            {isLoggedIn && (
              <button
                onClick={onAddItem}
                className="px-6 py-3 rounded-lg text-white transition-all hover:scale-105 inline-flex items-center gap-2"
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  background: 'rgba(45, 74, 74, 0.9)',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Plus className="w-5 h-5" />
                {texts.addFirst}
              </button>
            )}
          </motion.div>
        ) : (
          /* Grid Layout - Fixed 3 Columns */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-6"
          >
            {items.map((item) => (
              <ArchiveCard
                key={item.id}
                item={item}
                onEdit={isLoggedIn ? onEditItem : undefined}
                onDelete={isLoggedIn ? onDeleteItem : undefined}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </motion.div>
        )}

        {/* Floating Add Button (for logged in users when items exist) */}
        {isLoggedIn && items.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddItem}
            className="fixed bottom-24 right-8 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 transition-all"
            style={{
              background: 'linear-gradient(135deg, #A5EBFA 0%, #7DD3E8 100%)',
            }}
            title={texts.addItem}
          >
            <Plus className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </div>
    </div>
  );
}