import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { AntiqueItem } from './TimelineItem';
import { useLanguage } from './LanguageContext';

interface CertificateModalProps {
  item: AntiqueItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ item, isOpen, onClose }: CertificateModalProps) {
  const { t } = useLanguage();
  
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={onClose}
          >
            <div
              className="bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(180deg, #FDFCF8 0%, #F5F4F0 100%)',
              }}
            >
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 sm:p-6 flex items-center justify-between z-10">
                <h2 
                  className="text-2xl sm:text-3xl"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {t('certificate')}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="p-6 sm:p-12">
                <div className="text-center mb-8 sm:mb-12">
                  <div 
                    className="inline-block bg-accent text-accent-foreground px-6 sm:px-8 py-2 mb-6 sm:mb-8 text-lg sm:text-xl"
                    style={{ 
                      fontFamily: "'Noto Serif KR', serif",
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 20%, 100% 80%, 98% 100%, 2% 100%, 0% 80%, 0% 20%)'
                    }}
                  >
                    {t('authentic')}
                  </div>
                  
                  <h3 
                    className="text-2xl sm:text-4xl mb-3 sm:mb-4"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {t(`items.${item.id}.title`)}
                  </h3>
                  
                  <p 
                    className="text-base sm:text-xl text-muted-foreground"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    {t(`items.${item.id}.period`)} · {item.year}年
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
                  <div className="aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h4 
                        className="mb-3 text-accent text-base sm:text-lg"
                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                      >
                        {t('description')}
                      </h4>
                      <p 
                        className="text-muted-foreground leading-relaxed text-sm sm:text-base"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                      >
                        {t(`items.${item.id}.description`)}
                      </p>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 
                        className="mb-3 text-accent text-base sm:text-lg"
                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                      >
                        {t('details')}
                      </h4>
                      <div 
                        className="space-y-2 text-sm"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                      >
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('period')}</span>
                          <span>{t(`items.${item.id}.period`)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('year')}</span>
                          <span>{item.year}年</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('certNumber')}</span>
                          <span>K-{item.id.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t('condition')}</span>
                          <span>{t('conditionValue')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h4 
                        className="mb-3 text-accent text-base sm:text-lg"
                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                      >
                        {t('provenance')}
                      </h4>
                      <p 
                        className="text-muted-foreground text-sm leading-relaxed"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                      >
                        {t('provenanceText')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                  <div>
                    <p 
                      className="text-sm text-muted-foreground mb-2"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    >
                      {t('certDate')}
                    </p>
                    <p 
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    >
                      {t('certOrg')}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div 
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center text-accent text-lg sm:text-xl"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {t('seal')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}