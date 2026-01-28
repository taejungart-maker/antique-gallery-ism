import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => boolean;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const { language } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError(
        language === 'ko' 
          ? '아이디와 패스워드를 입력해주세요.' 
          : language === 'zh' 
          ? '请输入用户名和密码。' 
          : 'Please enter username and password.'
      );
      return;
    }

    const success = onLogin(username, password);
    if (success) {
      setUsername('');
      setPassword('');
      setError('');
      onClose();
    } else {
      setError(
        language === 'ko' 
          ? '아이디 또는 패스워드가 올바르지 않습니다.' 
          : language === 'zh' 
          ? '用户名或密码不正确。' 
          : 'Incorrect username or password.'
      );
    }
  };

  const handleClose = () => {
    setUsername('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background rounded-lg shadow-2xl w-full max-w-md relative"
              style={{
                background: 'linear-gradient(135deg, rgba(245, 248, 250, 0.98) 0%, rgba(253, 252, 248, 0.98) 100%)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary/50 hover:bg-secondary flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="p-6 pb-4 border-b border-border/30">
                <h2 
                  className="text-2xl text-center"
                  style={{ 
                    fontFamily: "'Noto Serif KR', serif",
                    color: '#1a3a3a'
                  }}
                >
                  {language === 'ko' ? '로그인' : language === 'zh' ? '登录' : 'Login'}
                </h2>
                <p 
                  className="text-sm text-muted-foreground text-center mt-2"
                  style={{ fontFamily: 'Pretendard, sans-serif' }}
                >
                  {language === 'ko' 
                    ? '관리자 계정으로 로그인하세요' 
                    : language === 'zh' 
                    ? '使用管理员账户登录' 
                    : 'Login with admin account'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Username Input */}
                  <div>
                    <label 
                      htmlFor="username" 
                      className="block text-sm mb-2"
                      style={{ 
                        fontFamily: 'Pretendard, sans-serif',
                        color: '#2d4a4a'
                      }}
                    >
                      {language === 'ko' ? '아이디' : language === 'zh' ? '用户名' : 'Username'}
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#A5EBFA]/50 transition-all"
                      placeholder={
                        language === 'ko' 
                          ? '아이디를 입력하세요' 
                          : language === 'zh' 
                          ? '输入用户名' 
                          : 'Enter username'
                      }
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <label 
                      htmlFor="password" 
                      className="block text-sm mb-2"
                      style={{ 
                        fontFamily: 'Pretendard, sans-serif',
                        color: '#2d4a4a'
                      }}
                    >
                      {language === 'ko' ? '패스워드' : language === 'zh' ? '密码' : 'Password'}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-[#A5EBFA]/50 transition-all pr-12"
                        placeholder={
                          language === 'ko' 
                            ? '패스워드를 입력하세요' 
                            : language === 'zh' 
                            ? '输入密码' 
                            : 'Enter password'
                        }
                        style={{ fontFamily: 'Pretendard, sans-serif' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm"
                      style={{ fontFamily: 'Pretendard, sans-serif' }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Login Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white transition-all hover:scale-105"
                    style={{
                      fontFamily: 'Pretendard, sans-serif',
                      background: 'linear-gradient(135deg, rgba(45, 74, 74, 0.9) 0%, rgba(26, 58, 58, 0.9) 100%)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    {language === 'ko' ? '로그인' : language === 'zh' ? '登录' : 'Login'}
                  </button>

                  {/* Demo Credentials Info */}
                  <div 
                    className="mt-4 p-3 rounded-lg bg-[#A5EBFA]/10 border border-[#A5EBFA]/30 text-sm"
                    style={{ fontFamily: 'Pretendard, sans-serif' }}
                  >
                    <p className="text-muted-foreground text-center">
                      {language === 'ko' 
                        ? '데모 계정: admin / admin123' 
                        : language === 'zh' 
                        ? '演示账户：admin / admin123' 
                        : 'Demo: admin / admin123'}
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
