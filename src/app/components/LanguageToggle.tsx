import { motion } from 'motion/react';
import { useLanguage } from './LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1 backdrop-blur-sm">
      <button
        onClick={() => setLanguage('ko')}
        className={`px-2.5 py-1.5 rounded-full text-xs transition-all relative min-w-[40px] ${
          language === 'ko'
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {language === 'ko' && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-background rounded-full shadow-sm"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">KO</span>
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-2.5 py-1.5 rounded-full text-xs transition-all relative min-w-[40px] ${
          language === 'zh'
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {language === 'zh' && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-background rounded-full shadow-sm"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">ZH</span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1.5 rounded-full text-xs transition-all relative min-w-[40px] ${
          language === 'en'
            ? 'text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        style={{ fontFamily: 'Pretendard, sans-serif' }}
      >
        {language === 'en' && (
          <motion.div
            layoutId="language-indicator"
            className="absolute inset-0 bg-background rounded-full shadow-sm"
            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}