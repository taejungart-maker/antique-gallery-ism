import { useState } from 'react';
import { X, Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => boolean;
}

export function PasswordChangeModal({ isOpen, onClose, onSubmit }: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (newPassword.length < 6) {
      setError('새 비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    const success = onSubmit(currentPassword, newPassword);
    
    if (success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      onClose();
    } else {
      setError('현재 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ backgroundColor: '#f8fafc' }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#A5EBFA' }}
            >
              <Lock className="w-5 h-5" style={{ color: '#0891b2' }} />
            </div>
            <h2 
              className="text-2xl font-semibold"
              style={{ fontFamily: 'Pretendard, sans-serif', color: '#1a3a3a' }}
            >
              비밀번호 변경
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: '#fee2e2', 
                borderColor: '#fecaca',
                color: '#991b1b'
              }}
            >
              <p className="text-sm font-medium" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                {error}
              </p>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Pretendard, sans-serif', color: '#374151' }}
            >
              현재 비밀번호
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 pr-12"
                style={{ 
                  fontFamily: 'Pretendard, sans-serif',
                  borderColor: '#e5e7eb',
                  focusRing: '#A5EBFA'
                }}
                placeholder="현재 비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Pretendard, sans-serif', color: '#374151' }}
            >
              새 비밀번호
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 pr-12"
                style={{ 
                  fontFamily: 'Pretendard, sans-serif',
                  borderColor: '#e5e7eb',
                  focusRing: '#A5EBFA'
                }}
                placeholder="새 비밀번호 (최소 6자)"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label 
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Pretendard, sans-serif', color: '#374151' }}
            >
              새 비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 pr-12"
                style={{ 
                  fontFamily: 'Pretendard, sans-serif',
                  borderColor: '#e5e7eb',
                  focusRing: '#A5EBFA'
                }}
                placeholder="새 비밀번호 다시 입력"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-lg border transition-colors"
              style={{ 
                fontFamily: 'Pretendard, sans-serif',
                borderColor: '#e5e7eb',
                color: '#6b7280'
              }}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg text-white transition-colors"
              style={{ 
                fontFamily: 'Pretendard, sans-serif',
                backgroundColor: '#06b6d4'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0891b2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
            >
              변경하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
