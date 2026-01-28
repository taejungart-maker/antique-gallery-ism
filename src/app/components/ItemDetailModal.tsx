import {
  X,
  Calendar,
  Ruler,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "./LanguageContext";
import type { AntiqueItem } from "./TimelineItem";
import { useState } from "react";

interface ItemDetailModalProps {
  item: AntiqueItem | null;
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
  onEdit?: (item: AntiqueItem) => void;
  onDelete?: (item: AntiqueItem) => void;
}

export function ItemDetailModal({
  item,
  isOpen,
  onClose,
  isLoggedIn,
  onEdit,
  onDelete,
}: ItemDetailModalProps) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!item) return null;

  // 이미지 배열 생성 (메인 + 추가 이미지들)
  const images = [
    item.imageUrl,
    ...(item.image2Url ? [item.image2Url] : []),
    ...(item.image3Url ? [item.image3Url] : []),
    ...(item.image4Url ? [item.image4Url] : []),
  ].filter(Boolean);

  // 디버깅: 이미지 개수 확인 (모바일에서도 확인 가능)
  console.log('📱 ItemDetailModal - Item ID:', item.id);
  console.log('🖼️ Total images available:', images.length);
  console.log('📸 Image URLs:', {
    main: item.imageUrl ? '✅' : '❌',
    image2: item.image2Url ? '✅' : '❌',
    image3: item.image3Url ? '✅' : '❌',
    image4: item.image4Url ? '✅' : '❌',
  });
  console.log('🔗 Full URLs:', {
    image2Url: item.image2Url,
    image3Url: item.image3Url,
    image4Url: item.image4Url,
  });

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length,
    );
  };

  // 현재 언어에 맞는 제목과 설명 가져오기
  const getTitle = () => {
    if (language === "zh" && item.titleZh) return item.titleZh;
    if (language === "en" && item.titleEn) return item.titleEn;
    return item.title;
  };

  const getDescription = () => {
    if (language === "zh" && item.descriptionZh)
      return item.descriptionZh;
    if (language === "en" && item.descriptionEn)
      return item.descriptionEn;
    return item.description;
  };

  // 컨텐츠 컴포넌트 (중복 방지)
  const renderContent = () => (
    <>
      {/* 이미지 섹션 */}
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        <img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={item.title}
          className="w-full h-auto"
          style={{
            maxWidth: "100%",
            width: "100%",
            height: "auto",
            maxHeight: "70vh",
            display: "block",
            objectFit: "contain",
          }}
        />

        {/* 화살표 버튼 */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-[50]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-[50]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm z-[50]">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Thumbnail Navigation */}
        {images.length > 1 && (
          <div className="grid grid-cols-3 gap-2 mt-4 px-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  idx === currentImageIndex
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 텍스트 섹션 */}
      <div className="p-6">
        {/* Title */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontFamily: "'Noto Serif KR', serif",
              color: "#1a3a3a",
              fontSize: "1.875rem",
              marginBottom: "8px",
            }}
          >
            {getTitle()}
          </h1>
          <p
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "1.125rem",
              color: "#6b7280",
            }}
          >
            {item.period}
          </p>
        </div>

        {/* Details Grid */}
        <div style={{ marginBottom: "24px" }}>
          {/* Year */}
          <div style={{ display: "flex", gap: "12px", padding: "16px", borderRadius: "8px", background: "rgba(229, 231, 235, 0.3)", marginBottom: "16px" }}>
            <Calendar style={{ width: "20px", height: "20px", color: "#5a7470", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "Pretendard, sans-serif", fontSize: "0.875rem", color: "#6b7280", marginBottom: "4px" }}>
                {language === "ko" ? "제작 연도" : language === "zh" ? "制作年份" : "Year"}
              </p>
              <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.125rem", color: "#2d4a4a" }}>
                {item.year}{language === "ko" ? "년" : language === "zh" ? "年" : ""}
              </p>
            </div>
          </div>

          {/* Period Range */}
          {item.yearStart && item.yearEnd && (
            <div style={{ display: "flex", gap: "12px", padding: "16px", borderRadius: "8px", background: "rgba(229, 231, 235, 0.3)", marginBottom: "16px" }}>
              <Calendar style={{ width: "20px", height: "20px", color: "#5a7470", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Pretendard, sans-serif", fontSize: "0.875rem", color: "#6b7280", marginBottom: "4px" }}>
                  {language === "ko" ? "작품 시대" : language === "zh" ? "作品年代" : "Period"}
                </p>
                <p style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.125rem", color: "#2d4a4a" }}>
                  {item.yearStart} - {item.yearEnd}{language === "ko" ? "년" : language === "zh" ? "年" : ""}
                </p>
              </div>
            </div>
          )}

          {/* Size */}
          {item.size && (
            <div style={{ display: "flex", gap: "12px", padding: "16px", borderRadius: "8px", background: "rgba(229, 231, 235, 0.3)" }}>
              <Ruler style={{ width: "20px", height: "20px", color: "#5a7470", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "Pretendard, sans-serif", fontSize: "0.875rem", color: "#6b7280", marginBottom: "4px" }}>
                  {language === "ko" ? "작품 크기" : language === "zh" ? "作品尺寸" : "Size"}
                </p>
                <p style={{ fontFamily: "Pretendard, sans-serif", fontSize: "1.125rem", color: "#2d4a4a" }}>
                  {item.size}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.125rem", color: "#2d4a4a", marginBottom: "12px" }}>
            {language === "ko" ? "상세 설명" : language === "zh" ? "详细说明" : "Description"}
          </h3>
          <p style={{ fontFamily: "Pretendard, sans-serif", fontSize: "1rem", lineHeight: "1.75", color: "#3d5a57" }}>
            {getDescription()}
          </p>

          {/* 수정/삭제 버튼 */}
          {isLoggedIn && (onEdit || onDelete) && (
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(item);
                  }}
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    fontSize: "0.8rem",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "Pretendard, sans-serif",
                    color: "#333",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#007bff";
                    e.currentTarget.style.color = "#007bff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ccc";
                    e.currentTarget.style.color = "#333";
                  }}
                >
                  ✏️ {language === "ko" ? "수정" : language === "zh" ? "编辑" : "Edit"}
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item);
                  }}
                  style={{
                    background: "none",
                    border: "1px solid #ccc",
                    fontSize: "0.8rem",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "Pretendard, sans-serif",
                    color: "#333",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#dc3545";
                    e.currentTarget.style.color = "#dc3545";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ccc";
                    e.currentTarget.style.color = "#333";
                  }}
                >
                  🗑️ {language === "ko" ? "삭제하기" : language === "zh" ? "删除" : "Delete"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e5e7eb, transparent)", marginBottom: "24px" }} />

        {/* Additional Info */}
        <div style={{ fontFamily: "Pretendard, sans-serif", fontSize: "0.875rem", color: "#6b7280" }}>
          <p style={{ marginBottom: "4px" }}>ID: {item.id}</p>
          {item.certificateUrl && (
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText style={{ width: "16px", height: "16px" }} />
              {language === "ko" ? "감정서 첨부됨" : language === "zh" ? "已附鉴定书" : "Certificate attached"}
            </p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container - PC는 중앙 정렬, 모바일은 상단부터 */}
          <div
            className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{
                background: "linear-gradient(135deg, rgba(253, 252, 248, 0.98) 0%, rgba(245, 244, 240, 0.98) 100%)",
              }}
              className="w-full min-h-full md:min-h-0 md:max-w-[1000px] md:rounded-lg shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-4 right-4 float-right z-[100] w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-md mr-4"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content - 데스크탑 2열 / 모바일 1열 */}
              <div className="clear-both">
                {/* 데스크탑: 2열 그리드 */}
                <div className="hidden md:grid md:grid-cols-2">
                  {renderContent()}
                </div>

                {/* 모바일: 1열 세로 스크롤 */}
                <div className="md:hidden">
                  {renderContent()}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}