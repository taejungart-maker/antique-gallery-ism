import { useState } from 'react';
import { X, Upload, Image as ImageIcon, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { translateText, translateMultiline } from '@/app/utils/translate';
import { toast } from 'sonner';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export function AddItemModal({ isOpen, onClose, onSubmit }: AddItemModalProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    titleZh: '',
    titleEn: '',
    year: '',
    yearStart: '',
    yearEnd: '',
    description: '',
    descriptionZh: '',
    descriptionEn: '',
    size: '',
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [image2, setImage2] = useState<File | null>(null);
  const [image2Preview, setImage2Preview] = useState<string>('');
  const [image3, setImage3] = useState<File | null>(null);
  const [image3Preview, setImage3Preview] = useState<string>('');
  const [image4, setImage4] = useState<File | null>(null);
  const [image4Preview, setImage4Preview] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationSuccess, setTranslationSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // AI 자동 번역 함수
  const handleAutoTranslate = async () => {
    if (!formData.title || !formData.description) {
      toast.error(language === 'ko' ? '한국어 제목과 설명을 먼저 입력하세요.' : '请先输入韩语标题和说明。');
      return;
    }

    setIsTranslating(true);
    setTranslationSuccess(false);
    toast.info('🤖 AI Translation in progress...');

    try {
      const [titleZh, titleEn, descZh, descEn] = await Promise.all([
        translateText(formData.title, 'zh'),
        translateText(formData.title, 'en'),
        translateMultiline(formData.description, 'zh'),
        translateMultiline(formData.description, 'en'),
      ]);

      setFormData(prev => ({
        ...prev,
        titleZh,
        titleEn,
        descriptionZh: descZh,
        descriptionEn: descEn,
      }));

      setTranslationSuccess(true);
      toast.success('✨ Translation completed successfully!');
    } catch (error) {
      console.error('Translation error:', error);
      toast.error(language === 'ko' ? '번역 중 오류가 발생했습니다.' : '翻译时出错。');
    } finally {
      setIsTranslating(false);
    }
  };

  // 이미지 리사이징 함수
  const resizeImage = (file: File, maxWidth: number = 1200): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // 비율 유지하면서 리사이징
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(resizedFile);
              } else {
                reject(new Error('Canvas to Blob failed'));
              }
            }, file.type, 0.9); // 90% 품질
          }
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 이미지 리사이징
        const resizedFile = await resizeImage(file, 1200);
        setMainImage(resizedFile);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setMainImagePreview(reader.result as string);
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Image resize error:', error);
        toast.error('이미지 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleImage2Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedFile = await resizeImage(file, 1200);
        setImage2(resizedFile);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage2Preview(reader.result as string);
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Image resize error:', error);
        toast.error('이미지 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleImage3Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedFile = await resizeImage(file, 1200);
        setImage3(resizedFile);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage3Preview(reader.result as string);
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Image resize error:', error);
        toast.error('이미지 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleImage4Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedFile = await resizeImage(file, 1200);
        setImage4(resizedFile);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage4Preview(reader.result as string);
        };
        reader.readAsDataURL(resizedFile);
      } catch (error) {
        console.error('Image resize error:', error);
        toast.error('이미지 처리 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('titleZh', formData.titleZh);
    data.append('titleEn', formData.titleEn);
    data.append('year', formData.year);
    data.append('yearStart', formData.yearStart);
    data.append('yearEnd', formData.yearEnd);
    data.append('description', formData.description);
    data.append('descriptionZh', formData.descriptionZh);
    data.append('descriptionEn', formData.descriptionEn);
    data.append('size', formData.size);
    if (mainImage) data.append('mainImage', mainImage);
    if (image2) data.append('image2', image2);
    if (image3) data.append('image3', image3);
    if (image4) data.append('image4', image4);
    
    onSubmit(data);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ title: '', titleZh: '', titleEn: '', year: '', yearStart: '', yearEnd: '', description: '', descriptionZh: '', descriptionEn: '', size: '' });
    setMainImage(null);
    setMainImagePreview('');
    setImage2(null);
    setImage2Preview('');
    setImage3(null);
    setImage3Preview('');
    setImage4(null);
    setImage4Preview('');
    setTranslationSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={handleClose}
          >
            <div
              className="bg-background rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(180deg, #FDFCF8 0%, #F5F4F0 100%)',
              }}
            >
              {/* Header */}
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 
                    className="text-2xl sm:text-3xl"
                    style={{ fontFamily: "'Noto Serif KR', serif" }}
                  >
                    {language === 'ko' ? '새 작품 등록' : '新作品登录'}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="flex-1 overflow-y-auto">
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-8">
                    {/* Main Description Section - Korean */}
                    <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl border-2 border-blue-200 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                            KR
                          </div>
                          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            주요 설명 (한국어)
                          </h3>
                        </div>
                        <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">필수</span>
                      </div>

                      {/* Title KR */}
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          제목 *
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                          placeholder="예: 백자 호"
                        />
                      </div>

                      {/* Description KR */}
                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          설명 *
                        </label>
                        <textarea
                          name="description"
                          required
                          rows={5}
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                          placeholder="작품에 대한 상세한 설명을 한국어로 입력하세요..."
                        />
                      </div>
                    </div>

                    {/* AI Auto-Translate Button */}
                    <div className="flex justify-center">
                      <motion.button
                        type="button"
                        onClick={handleAutoTranslate}
                        disabled={isTranslating || !formData.title || !formData.description}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-full transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: '600' }}
                      >
                        <Sparkles className={`w-6 h-6 ${isTranslating ? 'animate-spin' : ''}`} />
                        {isTranslating 
                          ? '✨ AI 번역 중...' 
                          : '🪄 영어와 중국어로 자동 번역'}
                      </motion.button>
                    </div>

                    {/* Translated Fields - English */}
                    <motion.div 
                      className={`bg-gradient-to-br from-white to-green-50 p-6 rounded-xl border-2 ${translationSuccess ? 'border-green-400' : 'border-gray-200'} shadow-sm transition-all`}
                      animate={translationSuccess ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                            EN
                          </div>
                          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            영어 번역
                          </h3>
                        </div>
                        {translationSuccess && formData.titleEn && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 text-green-600"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm font-medium">완료!</span>
                          </motion.div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          제목 (영어)
                        </label>
                        <input
                          type="text"
                          name="titleEn"
                          value={formData.titleEn}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                          placeholder="영어 제목이 여기에 표시됩니다..."
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          설명 (영어)
                        </label>
                        <textarea
                          name="descriptionEn"
                          rows={5}
                          value={formData.descriptionEn}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                          placeholder="영어 설명이 여기에 표시됩니다..."
                        />
                      </div>
                    </motion.div>

                    {/* Translated Fields - Chinese */}
                    <motion.div 
                      className={`bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl border-2 ${translationSuccess ? 'border-orange-400' : 'border-gray-200'} shadow-sm transition-all`}
                      animate={translationSuccess ? { scale: [1, 1.02, 1] } : {}}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">
                            CN
                          </div>
                          <h3 className="text-lg font-semibold" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                            중국어 번역
                          </h3>
                        </div>
                        {translationSuccess && formData.titleZh && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-1 text-orange-600"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm font-medium">완료!</span>
                          </motion.div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          제목 (중국어)
                        </label>
                        <input
                          type="text"
                          name="titleZh"
                          value={formData.titleZh}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                          placeholder="중국어 제목이 여기에 표시됩니다..."
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          설명 (중국어)
                        </label>
                        <textarea
                          name="descriptionZh"
                          rows={5}
                          value={formData.descriptionZh}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none"
                          style={{ fontFamily: 'Pretendard, sans-serif' }}
                          placeholder="중국어 설명이 여기에 표시됩니다..."
                        />
                      </div>
                    </motion.div>

                    {/* Other Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          제작 연도 *
                        </label>
                        <input
                          type="number"
                          name="year"
                          required
                          min="100"
                          max="2100"
                          value={formData.year}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1450"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          작품 크기 *
                        </label>
                        <input
                          type="text"
                          name="size"
                          required
                          value={formData.size}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="10x10cm"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          시대 시작 *
                        </label>
                        <input
                          type="number"
                          name="yearStart"
                          required
                          min="100"
                          max="2100"
                          value={formData.yearStart}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1400"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          시대 종료 *
                        </label>
                        <input
                          type="number"
                          name="yearEnd"
                          required
                          min="100"
                          max="2100"
                          value={formData.yearEnd}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="1500"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                        작품 이미지 *
                      </label>
                      {mainImagePreview ? (
                        <div className="relative aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
                          <img src={mainImagePreview} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setMainImage(null);
                              setMainImagePreview('');
                            }}
                            className="absolute top-2 right-2 p-2 bg-background/90 hover:bg-background rounded-full transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                          <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                          <p className="text-sm text-gray-500">클릭하여 이미지 업로드</p>
                          <input
                            type="file"
                            name="mainImage"
                            accept="image/*"
                            required
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Additional Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          추가 이미지 1
                        </label>
                        {image2Preview ? (
                          <div className="relative aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
                            <img src={image2Preview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setImage2(null);
                                setImage2Preview('');
                              }}
                              className="absolute top-2 right-2 p-2 bg-background/90 hover:bg-background rounded-full transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-500">클릭하여 이미지 업로드</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImage2Change}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          추가 이미지 2
                        </label>
                        {image3Preview ? (
                          <div className="relative aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
                            <img src={image3Preview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setImage3(null);
                                setImage3Preview('');
                              }}
                              className="absolute top-2 right-2 p-2 bg-background/90 hover:bg-background rounded-full transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-500">클릭하여 이미지 업로드</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImage3Change}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                          추가 이미지 3
                        </label>
                        {image4Preview ? (
                          <div className="relative aspect-[3/4] bg-secondary rounded-lg overflow-hidden">
                            <img src={image4Preview} alt="Preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                setImage4(null);
                                setImage4Preview('');
                              }}
                              className="absolute top-2 right-2 p-2 bg-background/90 hover:bg-background rounded-full transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full aspect-[3/4] border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all">
                            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                            <p className="text-sm text-gray-500">클릭하여 이미지 업로드</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImage4Change}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 font-medium shadow-lg"
                    >
                      <Upload className="w-5 h-5" />
                      작품 등록
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}