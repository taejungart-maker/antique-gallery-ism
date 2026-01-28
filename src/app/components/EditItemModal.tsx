import { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';
import type { AntiqueItem } from './TimelineItem';
import { toast } from 'sonner';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, data: FormData) => void;
  item: AntiqueItem | null;
}

export function EditItemModal({ isOpen, onClose, onSubmit, item }: EditItemModalProps) {
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
  const [existingImage2, setExistingImage2] = useState<string>('');
  const [image3, setImage3] = useState<File | null>(null);
  const [image3Preview, setImage3Preview] = useState<string>('');
  const [existingImage3, setExistingImage3] = useState<string>('');
  const [image4, setImage4] = useState<File | null>(null);
  const [image4Preview, setImage4Preview] = useState<string>('');
  const [existingImage4, setExistingImage4] = useState<string>('');
  
  useEffect(() => {
    if (item && isOpen) {
      setFormData({
        title: item.title,
        titleZh: item.titleZh || '',
        titleEn: item.titleEn || '',
        year: item.year.toString(),
        yearStart: item.yearStart || '',
        yearEnd: item.yearEnd || '',
        description: item.description,
        descriptionZh: item.descriptionZh || '',
        descriptionEn: item.descriptionEn || '',
        size: item.size || '',
      });
      setMainImagePreview(item.imageUrl);
      setExistingImage2(item.image2Url || '');
      setExistingImage3(item.image3Url || '');
      setExistingImage4(item.image4Url || '');
    }
  }, [item, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        // 이미지 리사이징
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
        // 이미지 리사이징
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
        // 이미지 리사이징
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
    if (!item) return;

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
    data.append('existingImageUrl', item.imageUrl);
    data.append('existingImage2Url', item.image2Url || '');
    data.append('existingImage3Url', item.image3Url || '');
    data.append('existingImage4Url', item.image4Url || '');
    
    onSubmit(item.id, data);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ title: '', titleZh: '', titleEn: '', year: '', yearStart: '', yearEnd: '', description: '', descriptionZh: '', descriptionEn: '', size: '' });
    setMainImage(null);
    setMainImagePreview('');
    setImage2(null);
    setImage2Preview('');
    setExistingImage2('');
    setImage3(null);
    setImage3Preview('');
    setExistingImage3('');
    setImage4(null);
    setImage4Preview('');
    setExistingImage4('');
    onClose();
  };

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
              className="bg-background rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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
                  {language === 'ko' ? '작품 수정' : language === 'zh' ? '修改作品' : 'Edit Item'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="space-y-6">
                  {/* 작품 제목 */}
                  <div>
                    <label 
                      htmlFor="title" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '작품 제목' : language === 'zh' ? '作品标题' : 'Title'} *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 작품 제목 (중국어) */}
                  <div>
                    <label 
                      htmlFor="titleZh" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '작품 제목 (중국어)' : language === 'zh' ? '作品标题（中文）' : 'Title (Chinese)'} *
                    </label>
                    <input
                      type="text"
                      id="titleZh"
                      name="titleZh"
                      required
                      value={formData.titleZh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 작품 제목 (영어) */}
                  <div>
                    <label 
                      htmlFor="titleEn" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '작품 제목 (영어)' : language === 'zh' ? '作品标题（英文）' : 'Title (English)'} *
                    </label>
                    <input
                      type="text"
                      id="titleEn"
                      name="titleEn"
                      required
                      value={formData.titleEn}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 제작 연도 */}
                  <div>
                    <label 
                      htmlFor="year" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '제작 연도' : language === 'zh' ? '制作年份' : 'Year'} *
                    </label>
                    <input
                      type="number"
                      id="year"
                      name="year"
                      required
                      min="100"
                      max="2100"
                      value={formData.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 작품 년도 범위 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="yearStart" 
                        className="block mb-2 text-accent"
                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                      >
                        {language === 'ko' ? '작품 년도 (시작)' : language === 'zh' ? '作品年份（开始）' : 'Period Start'} *
                      </label>
                      <input
                        type="number"
                        id="yearStart"
                        name="yearStart"
                        required
                        min="100"
                        max="2100"
                        value={formData.yearStart}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="yearEnd" 
                        className="block mb-2 text-accent"
                        style={{ fontFamily: "'Noto Serif KR', serif" }}
                      >
                        {language === 'ko' ? '작품 년도 (종료)' : language === 'zh' ? '作品年份（结束）' : 'Period End'} *
                      </label>
                      <input
                        type="number"
                        id="yearEnd"
                        name="yearEnd"
                        required
                        min="100"
                        max="2100"
                        value={formData.yearEnd}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                      />
                    </div>
                  </div>

                  {/* 상세 설명 */}
                  <div>
                    <label 
                      htmlFor="description" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '상세 설명' : language === 'zh' ? '详细说明' : 'Description'} *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 상세 설명 (중국어) */}
                  <div>
                    <label 
                      htmlFor="descriptionZh" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '상세 설명 (중국어)' : language === 'zh' ? '详细说明（中文）' : 'Description (Chinese)'} *
                    </label>
                    <textarea
                      id="descriptionZh"
                      name="descriptionZh"
                      required
                      rows={4}
                      value={formData.descriptionZh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 상세 설명 (영어) */}
                  <div>
                    <label 
                      htmlFor="descriptionEn" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '상세 설명 (영어)' : language === 'zh' ? '详细说明（英文）' : 'Description (English)'} *
                    </label>
                    <textarea
                      id="descriptionEn"
                      name="descriptionEn"
                      required
                      rows={4}
                      value={formData.descriptionEn}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 작품 크기 */}
                  <div>
                    <label 
                      htmlFor="size" 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '작품 크기' : language === 'zh' ? '作品尺寸' : 'Size'} *
                    </label>
                    <input
                      type="text"
                      id="size"
                      name="size"
                      required
                      value={formData.size}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* 작품 메인 이미지 */}
                  <div>
                    <label 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '작품 메인 이미지' : language === 'zh' ? '作品主图片' : 'Main Image'}
                    </label>
                    <div className="space-y-4">
                      {mainImagePreview && (
                        <div className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                          <img
                            src={mainImagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
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
                      )}
                      <label 
                        htmlFor="mainImage"
                        className="flex flex-col items-center justify-center w-full py-4 border-2 border-dashed border-border rounded-sm hover:border-accent hover:bg-secondary/50 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          <p 
                            className="text-sm text-muted-foreground"
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                          >
                            {language === 'ko' ? '이미지 변경' : language === 'zh' ? '更改图片' : 'Change Image'}
                          </p>
                        </div>
                        <input
                          type="file"
                          id="mainImage"
                          name="mainImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* 추가 이미지 2 */}
                  <div>
                    <label 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '추가 이미지 2' : language === 'zh' ? '附加图片 2' : 'Additional Image 2'} ({language === 'ko' ? '선택사항' : language === 'zh' ? '可选' : 'Optional'})
                    </label>
                    {existingImage2 && (
                      <div className="mb-4 relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                        <img
                          src={existingImage2}
                          alt="Image 2"
                          className="w-full h-full object-contain"
                        />
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
                    )}
                    <label 
                      htmlFor="image2"
                      className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-sm hover:border-accent hover:bg-secondary/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        <div className="text-left">
                          <p 
                            className="text-sm"
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                          >
                            {image2 
                              ? image2.name 
                              : (language === 'ko' ? '이미지 2 변경' : language === 'zh' ? '更改图片 2' : 'Change Image 2')}
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="image2"
                        name="image2"
                        accept="image/*"
                        onChange={handleImage2Change}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* 추가 이미지 3 */}
                  <div>
                    <label 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '추가 이미지 3' : language === 'zh' ? '附加图片 3' : 'Additional Image 3'} ({language === 'ko' ? '선택사항' : language === 'zh' ? '可选' : 'Optional'})
                    </label>
                    {existingImage3 && (
                      <div className="mb-4 relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                        <img
                          src={existingImage3}
                          alt="Image 3"
                          className="w-full h-full object-contain"
                        />
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
                    )}
                    <label 
                      htmlFor="image3"
                      className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-sm hover:border-accent hover:bg-secondary/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        <div className="text-left">
                          <p 
                            className="text-sm"
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                          >
                            {image3 
                              ? image3.name 
                              : (language === 'ko' ? '이미지 3 변경' : language === 'zh' ? '更改图片 3' : 'Change Image 3')}
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="image3"
                        name="image3"
                        accept="image/*"
                        onChange={handleImage3Change}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* 추가 이미지 4 */}
                  <div>
                    <label 
                      className="block mb-2 text-accent"
                      style={{ fontFamily: "'Noto Serif KR', serif" }}
                    >
                      {language === 'ko' ? '추가 이미지 4' : language === 'zh' ? '附加图片 4' : 'Additional Image 4'} ({language === 'ko' ? '선택사항' : language === 'zh' ? '可选' : 'Optional'})
                    </label>
                    {existingImage4 && (
                      <div className="mb-4 relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                        <img
                          src={existingImage4}
                          alt="Image 4"
                          className="w-full h-full object-contain"
                        />
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
                    )}
                    <label 
                      htmlFor="image4"
                      className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-border rounded-sm hover:border-accent hover:bg-secondary/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                        <div className="text-left">
                          <p 
                            className="text-sm"
                            style={{ fontFamily: 'Pretendard, sans-serif' }}
                          >
                            {image4 
                              ? image4.name 
                              : (language === 'ko' ? '이미지 4 변경' : language === 'zh' ? '更改图片 4' : 'Change Image 4')}
                          </p>
                        </div>
                      </div>
                      <input
                        type="file"
                        id="image4"
                        name="image4"
                        accept="image/*"
                        onChange={handleImage4Change}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* 버튼 */}
                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 bg-secondary hover:bg-muted text-foreground rounded-sm transition-colors"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    {language === 'ko' ? '취소' : language === 'zh' ? '取消' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-sm transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    <Upload className="w-4 h-4" />
                    {language === 'ko' ? '수정하기' : language === 'zh' ? '修改' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}