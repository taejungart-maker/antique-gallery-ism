import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Link as LinkIcon, Upload } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface AddArchiveItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export function AddArchiveItemModal({ isOpen, onClose, onSubmit }: AddArchiveItemModalProps) {
  const { language } = useLanguage();
  const [itemType, setItemType] = useState<'image' | 'link'>('image');
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('type', itemType);
    onSubmit(formData);
    
    // Reset form
    e.currentTarget.reset();
    setPreviewImage('');
    setItemType('image');
    onClose();
  };

  const t = {
    ko: {
      addToArchive: '아카이브에 추가',
      selectType: '유형 선택',
      image: '이미지',
      link: '링크',
      title: '제목 (선택사항)',
      uploadImage: '이미지 업로드',
      clickToUpload: '클릭하여 업로드',
      url: 'URL',
      enterUrl: 'URL 입력',
      notes: '메모',
      enterNotes: '개인 메모 입력...',
      cancel: '취소',
      add: '추가',
    },
    zh: {
      addToArchive: '添加到档案',
      selectType: '选择类型',
      image: '图片',
      link: '链接',
      title: '标题（可选）',
      uploadImage: '上传图片',
      clickToUpload: '点击上传',
      url: '网址',
      enterUrl: '输入网址',
      notes: '备注',
      enterNotes: '输入个人备注...',
      cancel: '取消',
      add: '添加',
    },
    en: {
      addToArchive: 'Add to Archive',
      selectType: 'Select Type',
      image: 'Image',
      link: 'Link',
      title: 'Title (Optional)',
      uploadImage: 'Upload Image',
      clickToUpload: 'Click to Upload',
      url: 'URL',
      enterUrl: 'Enter URL',
      notes: 'Notes',
      enterNotes: 'Enter personal notes...',
      cancel: 'Cancel',
      add: 'Add',
    },
  };

  const texts = t[language as keyof typeof t] || t.en;

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
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto z-50 rounded-xl shadow-2xl"
            style={{
              background: '#FDFCF8',
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(44, 44, 44, 0.02) 0px, rgba(44, 44, 44, 0.02) 2px, transparent 2px, transparent 4px),
                repeating-linear-gradient(90deg, rgba(44, 44, 44, 0.02) 0px, rgba(44, 44, 44, 0.02) 2px, transparent 2px, transparent 4px)
              `,
            }}
          >
            {/* Header */}
            <div 
              className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between"
              style={{
                background: '#A5EBFA',
                borderColor: 'rgba(0, 0, 0, 0.08)',
              }}
            >
              <h2 
                className="text-2xl"
                style={{ 
                  fontFamily: "'Noto Serif KR', serif",
                  color: '#1a3a3a'
                }}
              >
                {texts.addToArchive}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Type Selection */}
              <div>
                <label 
                  className="block mb-3 text-sm font-medium"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {texts.selectType}
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setItemType('image')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      itemType === 'image' 
                        ? 'border-[#A5EBFA] bg-[#A5EBFA]/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span style={{ fontFamily: 'Pretendard, sans-serif' }}>{texts.image}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemType('link')}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                      itemType === 'link' 
                        ? 'border-[#A5EBFA] bg-[#A5EBFA]/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <LinkIcon className="w-5 h-5" />
                    <span style={{ fontFamily: 'Pretendard, sans-serif' }}>{texts.link}</span>
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label 
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {texts.title}
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5EBFA]"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                />
              </div>

              {/* Image Upload */}
              {itemType === 'image' && (
                <div>
                  <label 
                    className="block mb-2 text-sm font-medium"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {texts.uploadImage}
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required={itemType === 'image'}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-[#A5EBFA] transition-colors"
                  >
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <Upload className="w-12 h-12 text-gray-400" />
                        <p 
                          className="text-gray-600"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                        >
                          {texts.clickToUpload}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Link URL */}
              {itemType === 'link' && (
                <div>
                  <label 
                    htmlFor="url"
                    className="block mb-2 text-sm font-medium"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {texts.url}
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder={texts.enterUrl}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5EBFA]"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                    required={itemType === 'link'}
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label 
                  htmlFor="notes"
                  className="block mb-2 text-sm font-medium"
                  style={{ fontFamily: "'Noto Serif KR', serif" }}
                >
                  {texts.notes}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder={texts.enterNotes}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A5EBFA] resize-none"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                >
                  {texts.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg text-white transition-all hover:scale-105"
                  style={{ 
                    fontFamily: 'Pretendard, sans-serif',
                    background: 'rgba(45, 74, 74, 0.9)',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {texts.add}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
