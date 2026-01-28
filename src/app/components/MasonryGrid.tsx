import { useState } from 'react';
import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import type { AntiqueItem } from './TimelineItem';
import { useLanguage } from './LanguageContext';

interface MasonryGridProps {
  items: AntiqueItem[];
  onItemClick: (item: AntiqueItem) => void;
  onEditItem?: (item: AntiqueItem) => void;
  onDeleteItem?: (item: AntiqueItem) => void;
  isLoggedIn?: boolean;
  isLoading?: boolean;
}

export function MasonryGrid({ items, onItemClick, isLoading }: MasonryGridProps) {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // 년도별로 그룹화
  const years = Array.from(new Set(items.map(item => Math.floor(item.year / 100) * 100)))
    .sort((a, b) => b - a);

  // 필터링된 아이템
  const filteredItems = selectedYear
    ? items.filter(item => Math.floor(item.year / 100) * 100 === selectedYear)
    : items;

  return (
    <div className="w-full">
      {/* 년도 필터 */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-10 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedYear(null)}
          className={`px-6 py-2 rounded-full border transition-all text-sm font-semibold ${selectedYear === null
              ? 'bg-[#8D6E63] text-white border-[#8D6E63]'
              : 'bg-white text-gray-800 border-gray-200 hover:border-[#8D6E63]'
            }`}
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {language === 'en' ? 'All' : language === 'ko' ? '전체' : '全部'}
        </motion.button>
        {years.map((year) => (
          <motion.button
            key={year}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedYear(year)}
            className={`px-6 py-2 rounded-full border transition-all text-sm font-semibold ${selectedYear === year
                ? 'bg-[#8D6E63] text-white border-[#8D6E63]'
                : 'bg-white text-gray-800 border-gray-200 hover:border-[#8D6E63]'
              }`}
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {language === 'en' ? `${year}s` : `${year}년대`}
          </motion.button>
        ))}
      </div>

      {/* 그리드 레이아웃 (True Masonry) */}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4, 1200: 5 }}
      >
        <Masonry gutter="12px">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
              onClick={() => onItemClick(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p
                  className="text-xs mb-1 text-white/80 font-medium"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {language === 'en' ? item.year : `${item.year}년`}
                </p>
                <h3
                  className="text-sm sm:text-base text-white font-medium line-clamp-2"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {item.title}
                </h3>
              </div>

              {/* 년도 뱃지 (평상시에도 작게 노출) */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-gray-600 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                {item.year}
              </div>
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {/* 로딩 중 */}
      {isLoading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[#8D6E63]"></div>
          <p className="text-gray-400 mt-4 text-sm font-medium">
            {language === 'en' ? 'Loading artworks...' : language === 'ko' ? '작품을 불러오는 중...' : '正在加载作品...'}
          </p>
        </div>
      )}

      {/* 작품 없음 */}
      {!isLoading && filteredItems.length === 0 && (
        <div className="text-center py-24">
          <p className="text-gray-400 text-lg">
            {language === 'en' ? 'No artworks found for this period.' : language === 'ko' ? '해당 연도의 작품이 없습니다.' : '该年代没有作品。'}
          </p>
        </div>
      )}
    </div>
  );
}