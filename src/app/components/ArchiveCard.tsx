import { motion } from 'motion/react';
import { Trash2, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from './LanguageContext';

// VERSION: 2.0 - Mobile delete button fix
export interface ArchiveItem {
  id: string;
  type: 'image' | 'link';
  title?: string;
  imageUrl?: string;
  url?: string;  // Changed from linkUrl to url
  linkUrl?: string;  // Keep for backward compatibility
  linkTitle?: string;
  linkFavicon?: string;
  notes?: string;
  createdAt: number | string;
}

interface ArchiveCardProps {
  item: ArchiveItem;
  onEdit?: (item: ArchiveItem) => void;
  onDelete?: (id: string) => void;
  isLoggedIn?: boolean;
}

export function ArchiveCard({ item, onEdit, onDelete, isLoggedIn }: ArchiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const { language } = useLanguage();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.type === 'image') {
      setShowImageModal(true);
    }
  };

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          onClick={handleCardClick}
          className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FDFCF8 100%)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Image Type */}
          {item.type === 'image' && item.imageUrl && (
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img 
                src={item.imageUrl} 
                alt={item.title || 'Archive image'}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {item.title && (
                <div 
                  className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                >
                  <p 
                    className="text-white text-base font-medium drop-shadow-lg"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {item.title}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Link Type */}
          {item.type === 'link' && (
            <div className="p-6 min-h-[200px] flex flex-col justify-between bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/30">
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {item.linkFavicon ? (
                    <img 
                      src={item.linkFavicon} 
                      alt="favicon"
                      className="w-8 h-8"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <ExternalLink className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 
                    className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                    style={{ fontFamily: "'Noto Serif KR', serif", color: '#1a3a3a' }}
                  >
                    {item.linkTitle || item.title || 'Untitled Link'}
                  </h3>
                  {item.url && (
                    <p 
                      className="text-xs text-gray-500 truncate"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    >
                      {item.url}
                    </p>
                  )}
                </div>
              </div>
              
              {/* External link indicator */}
              <div className="flex items-center gap-2 text-xs text-blue-600 font-medium mt-4">
                <ExternalLink className="w-3 h-3" />
                <span style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  {language === 'ko' ? '링크 열기' : language === 'zh' ? '打开链接' : 'Open Link'}
                </span>
              </div>
            </div>
          )}

          {/* Notes Section */}
          {item.notes && (
            <div 
              className="px-5 py-4 border-t"
              style={{ 
                borderColor: 'rgba(0, 0, 0, 0.06)',
                background: 'rgba(253, 252, 248, 0.7)'
              }}
            >
              <p 
                className="text-sm text-gray-700 line-clamp-3 leading-relaxed"
                style={{ fontFamily: 'Pretendard, sans-serif' }}
              >
                {item.notes}
              </p>
            </div>
          )}

          {/* Action Buttons - 모바일에서도 항상 보임 */}
          {isLoggedIn && onDelete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-3 right-3 flex gap-2"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(
                    language === 'ko' 
                      ? '이 항목을 삭제하시겠습니까?' 
                      : language === 'zh' 
                      ? '确定要删除此项吗？' 
                      : 'Are you sure you want to delete this item?'
                  )) {
                    onDelete(item.id);
                  }
                }}
                className="p-2.5 rounded-full bg-red-500 hover:bg-red-600 shadow-xl transition-all hover:scale-110"
                title={language === 'ko' ? '삭제' : language === 'zh' ? '删除' : 'Delete'}
              >
                <Trash2 className="w-4 h-4 text-white" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && item.imageUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={(e) => {
            e.stopPropagation();
            setShowImageModal(false);
          }}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.imageUrl}
              alt={item.title || 'Archive image'}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              style={{ maxHeight: '90vh' }}
            />
            
            {/* Close Button */}
            <button
              className="absolute -top-4 -right-4 p-3 rounded-full bg-white hover:bg-gray-100 shadow-2xl transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Delete Button (for logged in users) */}
            {isLoggedIn && onDelete && (
              <button
                className="absolute -top-4 -right-20 p-3 rounded-full bg-red-500 hover:bg-red-600 shadow-2xl transition-all hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(
                    language === 'ko' 
                      ? '이 항목을 삭제하시겠습니까?' 
                      : language === 'zh' 
                      ? '确定要删除此项吗？' 
                      : 'Are you sure you want to delete this item?'
                  )) {
                    onDelete(item.id);
                    setShowImageModal(false);
                  }
                }}
                title={language === 'ko' ? '삭제' : language === 'zh' ? '删除' : 'Delete'}
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            )}
            
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
                <p 
                  className="text-white text-xl font-medium drop-shadow-lg"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {item.title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}