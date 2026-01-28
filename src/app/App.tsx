import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/app/components/LanguageContext';
import { LanguageToggle } from '@/app/components/LanguageToggle';
import { MasonryGrid } from '@/app/components/MasonryGrid';
import { ItemDetailModal } from '@/app/components/ItemDetailModal';
import { AdminFAB } from '@/app/components/AdminFAB';
import { AdminPanel } from '@/app/components/AdminPanel';
import { AddItemModal } from '@/app/components/AddItemModal';
import { EditItemModal } from '@/app/components/EditItemModal';
import { LoginModal } from '@/app/components/LoginModal';
import { PasswordChangeModal } from '@/app/components/PasswordChangeModal';
import { ArchivePage } from '@/app/components/ArchivePage';
import { AddArchiveItemModal } from '@/app/components/AddArchiveItemModal';
import { Footer } from '@/app/components/Footer';
import type { AntiqueItem } from '@/app/components/TimelineItem';
import type { ArchiveItem } from '@/app/components/ArchiveCard';
import { Toaster, toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { projectId, publicAnonKey } from '@/utils/supabase/info';
import { Archive, Settings } from 'lucide-react';

// VERSION: 2.0.7 - LOGO 36PX UPDATE + ULTRA CACHE BUSTER
const logo = "/logo_yehwa.jpg"; // Use public logo or placeholder

function AppContent() {
  const { language } = useLanguage();
  const [items, setItems] = useState<AntiqueItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<AntiqueItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showArchive, setShowArchive] = useState(false);
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>([]);
  const [isAddArchiveModalOpen, setIsAddArchiveModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] = useState(false);

  // 🔥🔥🔥 ULTRA MOBILE CACHE KILLER v2.0.7 🔥🔥🔥
  useEffect(() => {
    const APP_VERSION = '2.0.7';
    const BUILD_ID = Date.now(); // 매번 다른 ID

    console.log(`%c🚀 예화월드 VERSION ${APP_VERSION}`, 'color: #06b6d4; font-size: 20px; font-weight: bold;');
    console.log(`%c✨ Build ID: ${BUILD_ID}`, 'color: #10b981; font-size: 14px;');
    console.log('%c📱 로고 크기: 36px × 36px', 'color: #8b5cf6; font-size: 14px;');

    // 🔥 STEP 1: Service Worker 완전 제거
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
          console.log('🗑️ Service Worker unregistered');
        }
      });
    }

    // 🔥 STEP 2: 모든 캐시 삭제
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
          console.log('🗑️ Cache deleted:', name);
        });
      });
    }

    // 🔥 STEP 3: 메타 태그로 캐시 방지
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Cache-Control';
    meta.content = 'no-cache, no-store, must-revalidate, max-age=0';
    document.head.appendChild(meta);

    const meta2 = document.createElement('meta');
    meta2.httpEquiv = 'Pragma';
    meta2.content = 'no-cache';
    document.head.appendChild(meta2);

    const meta3 = document.createElement('meta');
    meta3.httpEquiv = 'Expires';
    meta3.content = '0';
    document.head.appendChild(meta3);

    // 🔥 STEP 4: localStorage에 버전 정보 저장
    const storedVersion = localStorage.getItem('app-version');
    if (storedVersion !== APP_VERSION) {
      console.log(`%c🔄 버전 업데이트 감지: ${storedVersion} → ${APP_VERSION}`, 'color: #f59e0b; font-size: 16px; font-weight: bold;');
      localStorage.setItem('app-version', APP_VERSION);
      localStorage.setItem('last-update', new Date().toISOString());

      // 모든 sessionStorage 클리어
      sessionStorage.clear();
      console.log('🧹 SessionStorage cleared');
    }

    // 🔥 STEP 5: 강제 리로드 (버전별로 한 번만)
    const reloadKey = `force-reloaded-v${APP_VERSION}`;
    const hasReloaded = sessionStorage.getItem(reloadKey);

    if (!hasReloaded) {
      console.log('%c🔄 강제 새로고침 시작...', 'color: #ef4444; font-size: 16px; font-weight: bold;');
      sessionStorage.setItem(reloadKey, 'true');
      sessionStorage.setItem('reload-timestamp', new Date().toISOString());

      // Hard reload with cache bypass
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return; // 리로드 전에 함수 종료
    }

    // 🔥 STEP 6: 모바일에서 버전 확인 알림 (한 번만)
    const alertKey = `version-alert-shown-${APP_VERSION}`;
    const hasShownVersionAlert = sessionStorage.getItem(alertKey);

    if (!hasShownVersionAlert) {
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        const deviceType = isMobile ? '📱 모바일' : '💻 데스크톱';

        console.log(`%c✅ 버전 ${APP_VERSION} 로드 완료!`, 'color: #10b981; font-size: 18px; font-weight: bold;');
        console.log(`${deviceType} | 화면: ${window.innerWidth}×${window.innerHeight}px`);
        console.log('✨ 로고 크기: 36px (헤더 + Footer)');

        if (isMobile) {
          alert(`✅ 예화월드 v${APP_VERSION}\n\n로고 크기: 36px로 업데이트됨\n비밀번호 변경 기능 추가\n\n정상 작동 중입니다! 🎉`);
        }

        sessionStorage.setItem(alertKey, 'true');
      }, 500);
    }
  }, []);

  // 번역 텍스트
  const translations = {
    ko: {
      title: '예화월드',
      archive: '보관함',
      login: '로그인',
      logout: '로그아웃',
      loading: '로딩 중...',
      noItems: '작품이 없습니다.',
      loginSuccess: '로그인 성공!',
      loginFailed: '로그인 실패! 아이디 또는 비밀번호를 확인하세요.',
      logoutMessage: '로그아웃되었습니다.',
    },
    zh: {
      title: '艺华世界',
      archive: '档案',
      login: '登录',
      logout: '登出',
      loading: '加载中...',
      noItems: '没有作品。',
      loginSuccess: '登录成功！',
      loginFailed: '登录失败！请检查用户名或密码。',
      logoutMessage: '已登出。',
    },
    en: {
      title: 'Yehwa World',
      archive: 'Archive',
      login: 'Login',
      logout: 'Logout',
      loading: 'Loading...',
      noItems: 'No items.',
      loginSuccess: 'Login successful!',
      loginFailed: 'Login failed! Please check your ID or password.',
      logoutMessage: 'Logged out.',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  // Fetch artworks from server
  useEffect(() => {
    fetchArtworks();
    fetchArchiveItems(); // Archive 데이터도 함께 로드
  }, []);

  const fetchArtworks = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Fetching artworks from server...');

      // 캐시 무효화를 위한 타임스탬프 추가
      const timestamp = new Date().getTime();
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/artworks?t=${timestamp}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Artworks fetched:', data);

      if (data.success && Array.isArray(data.items)) {
        // 데이터 확인용 로그 추가
        console.log('📱 모바일 확인: 총', data.items.length, '개 작품');
        data.items.forEach((item: any) => {
          const imageUrls = {
            imageUrl: item.imageUrl ? '✅' : '❌',
            image2Url: item.image2Url ? '✅' : '❌',
            image3Url: item.image3Url ? '✅' : '❌',
            image4Url: item.image4Url ? '✅' : '❌',
          };
          const totalImages = Object.values(imageUrls).filter(v => v === '✅').length;
          console.log(`🎨 Item ${item.id}: ${totalImages}/4 images`, imageUrls);
        });
        setItems(data.items);
      } else {
        console.error('Invalid data format:', data);
        setItems([]);
      }
    } catch (error) {
      console.error('❌ Error fetching artworks:', error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Archive 데이터 로드
  const fetchArchiveItems = async () => {
    try {
      console.log('🔄 Fetching archive items from server...');

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/archive`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Archive items fetched:', data);

      if (data.success && Array.isArray(data.items)) {
        setArchiveItems(data.items);
      } else {
        console.error('Invalid archive data format:', data);
        setArchiveItems([]);
      }
    } catch (error) {
      console.error('❌ Error fetching archive items:', error);
      setArchiveItems([]);
    }
  };

  const handleItemClick = (item: AntiqueItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  const handleLogin = (username: string, password: string) => {
    // localStorage에서 저장된 비밀번호 확인 (없으면 기본값 'admin123')
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';

    if (username === 'admin' && password === storedPassword) {
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      toast.success(t.loginSuccess);
      return true;
    }
    toast.error(t.loginFailed);
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info(t.logoutMessage);
  };

  const handlePasswordChange = (currentPassword: string, newPassword: string): boolean => {
    // 현재 비밀번호 확인 (localStorage에 저장된 비밀번호 또는 기본값)
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';

    if (currentPassword !== storedPassword) {
      toast.error('현재 비밀번호가 올바르지 않습니다.');
      return false;
    }

    // 새 비밀번호 저장
    localStorage.setItem('adminPassword', newPassword);
    toast.success('비밀번호가 성공적으로 변경되었습니다!');
    return true;
  };

  const handleAddItem = async (data: FormData) => {
    try {
      console.log('📝 Adding new artwork...');
      toast.loading('작품을 업로드하는 중...', { id: 'upload' });

      // 메인 이미지 업로드
      const mainImage = data.get('mainImage') as File;
      if (!mainImage) {
        toast.error('메인 이미지를 선택해주세요.', { id: 'upload' });
        return;
      }

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/jpeg',
        initialQuality: 0.85,
      };

      const compressedFile = await imageCompression(mainImage, options);
      console.log('Original size:', (mainImage.size / 1024).toFixed(2), 'KB');
      console.log('Compressed size:', (compressedFile.size / 1024).toFixed(2), 'KB');

      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(compressedFile);
      });

      const base64Image = await base64Promise;

      const filename = `artwork-${Date.now()}.jpg`;
      const uploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ base64Image, filename, bucketName: 'artworks' }),
      });

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }

      const uploadData = await uploadResponse.json();
      console.log('✅ Image uploaded:', uploadData);

      if (!uploadData.success || !uploadData.url) {
        throw new Error('Failed to get image URL');
      }

      const imageUrl = uploadData.url;

      // 감정서 이미지 업로드
      let certificateUrl: string | undefined = undefined;
      const certificate = data.get('certificate') as File;

      if (certificate) {
        const certOptions = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.8,
        };

        const compressedCert = await imageCompression(certificate, certOptions);

        const certReader = new FileReader();
        const certBase64Promise = new Promise<string>((resolve) => {
          certReader.onloadend = () => resolve(certReader.result as string);
          certReader.readAsDataURL(compressedCert);
        });

        const base64Cert = await certBase64Promise;

        const certFilename = `certificate-${Date.now()}.jpg`;
        const certUploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Cert, filename: certFilename, bucketName: 'artworks' }),
        });

        if (certUploadResponse.ok) {
          const certUploadData = await certUploadResponse.json();
          if (certUploadData.success && certUploadData.url) {
            certificateUrl = certUploadData.url;
            console.log('✅ Certificate uploaded:', certificateUrl);
          }
        }
      }

      // 추가 이미지 2 업로드
      let image2Url: string | undefined = undefined;
      const image2 = data.get('image2') as File;

      if (image2) {
        const img2Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedImg2 = await imageCompression(image2, img2Options);

        const img2Reader = new FileReader();
        const img2Base64Promise = new Promise<string>((resolve) => {
          img2Reader.onloadend = () => resolve(img2Reader.result as string);
          img2Reader.readAsDataURL(compressedImg2);
        });

        const base64Img2 = await img2Base64Promise;

        const img2Filename = `artwork2-${Date.now()}.jpg`;
        const img2UploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Img2, filename: img2Filename, bucketName: 'artworks' }),
        });

        if (img2UploadResponse.ok) {
          const img2UploadData = await img2UploadResponse.json();
          if (img2UploadData.success && img2UploadData.url) {
            image2Url = img2UploadData.url;
            console.log('✅ Image 2 uploaded:', image2Url);
          }
        }
      }

      // 추가 이미지 3 업로드
      let image3Url: string | undefined = undefined;
      const image3 = data.get('image3') as File;

      if (image3) {
        const img3Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedImg3 = await imageCompression(image3, img3Options);

        const img3Reader = new FileReader();
        const img3Base64Promise = new Promise<string>((resolve) => {
          img3Reader.onloadend = () => resolve(img3Reader.result as string);
          img3Reader.readAsDataURL(compressedImg3);
        });

        const base64Img3 = await img3Base64Promise;

        const img3Filename = `artwork3-${Date.now()}.jpg`;
        const img3UploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Img3, filename: img3Filename, bucketName: 'artworks' }),
        });

        if (img3UploadResponse.ok) {
          const img3UploadData = await img3UploadResponse.json();
          if (img3UploadData.success && img3UploadData.url) {
            image3Url = img3UploadData.url;
            console.log('✅ Image 3 uploaded:', image3Url);
          }
        }
      }

      // 추가 이미지 4 업로드
      let image4Url: string | undefined = undefined;
      const image4 = data.get('image4') as File;

      if (image4) {
        const img4Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedImg4 = await imageCompression(image4, img4Options);

        const img4Reader = new FileReader();
        const img4Base64Promise = new Promise<string>((resolve) => {
          img4Reader.onloadend = () => resolve(img4Reader.result as string);
          img4Reader.readAsDataURL(compressedImg4);
        });

        const base64Img4 = await img4Base64Promise;

        const img4Filename = `artwork4-${Date.now()}.jpg`;
        const img4UploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Img4, filename: img4Filename, bucketName: 'artworks' }),
        });

        if (img4UploadResponse.ok) {
          const img4UploadData = await img4UploadResponse.json();
          if (img4UploadData.success && img4UploadData.url) {
            image4Url = img4UploadData.url;
            console.log('✅ Image 4 uploaded:', image4Url);
          }
        }
      }

      // Create artwork record
      const title = data.get('title') as string;
      const titleZh = data.get('titleZh') as string;
      const titleEn = data.get('titleEn') as string;
      const description = data.get('description') as string;
      const descriptionZh = data.get('descriptionZh') as string;
      const descriptionEn = data.get('descriptionEn') as string;
      const year = parseInt(data.get('year') as string) || 1900;
      const yearStart = data.get('yearStart') as string;
      const yearEnd = data.get('yearEnd') as string;
      const period = data.get('period') as string;
      const size = data.get('size') as string;

      const newItem = {
        id: Date.now().toString(),
        title,
        titleZh,
        titleEn,
        description,
        descriptionZh,
        descriptionEn,
        year,
        yearStart,
        yearEnd,
        period,
        size,
        imageUrl,
        image2Url,
        image3Url,
        image4Url,
      };

      console.log('📤 Sending to server:', newItem);

      const addResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/artworks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(newItem),
      });

      if (!addResponse.ok) {
        const errorText = await addResponse.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const addData = await addResponse.json();
      console.log('✅ Server response:', addData);

      if (addData.success) {
        await fetchArtworks();
        toast.success('작품이 성공적으로 추가되었습니다!', { id: 'upload' });
        setIsAddModalOpen(false);
      } else {
        throw new Error(addData.error || 'Failed to add artwork');
      }
    } catch (error) {
      console.error('❌ Error adding artwork:', error);
      toast.error(`작품 추가 중 오류가 발생했습니다: ${error}`, { id: 'upload' });
    }
  };

  const handleEditItem = async (id: string, data: FormData) => {
    try {
      console.log('✏️ Editing artwork:', id);
      toast.loading('작품을 수정하는 중...', { id: 'edit' });

      const existingImageUrl = data.get('existingImageUrl') as string;
      let imageUrl = existingImageUrl;

      // 새 메인 이미지가 있으면 업로드
      const mainImage = data.get('mainImage') as File;
      if (mainImage) {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedFile = await imageCompression(mainImage, options);

        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(compressedFile);
        });

        const base64Image = await base64Promise;

        const filename = `artwork-${Date.now()}.jpg`;
        const uploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image, filename, bucketName: 'artworks' }),
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          if (uploadData.success && uploadData.url) {
            imageUrl = uploadData.url;
            console.log('✅ New image uploaded:', imageUrl);
          }
        }
      }

      // 추가 이미지 2 처리
      const existingImage2Url = data.get('existingImage2Url') as string;
      let image2Url: string | undefined = existingImage2Url || undefined;
      const image2 = data.get('image2') as File;

      if (image2) {
        const img2Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedImg2 = await imageCompression(image2, img2Options);

        const img2Reader = new FileReader();
        const img2Base64Promise = new Promise<string>((resolve) => {
          img2Reader.onloadend = () => resolve(img2Reader.result as string);
          img2Reader.readAsDataURL(compressedImg2);
        });

        const base64Img2 = await img2Base64Promise;

        const img2Filename = `artwork2-${Date.now()}.jpg`;
        const img2UploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Img2, filename: img2Filename, bucketName: 'artworks' }),
        });

        if (img2UploadResponse.ok) {
          const img2UploadData = await img2UploadResponse.json();
          if (img2UploadData.success && img2UploadData.url) {
            image2Url = img2UploadData.url;
            console.log('✅ Image 2 uploaded:', image2Url);
          }
        }
      }

      // 추가 이미지 3 처리
      const existingImage3Url = data.get('existingImage3Url') as string;
      let image3Url: string | undefined = existingImage3Url || undefined;
      const image3 = data.get('image3') as File;

      if (image3) {
        const img3Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedImg3 = await imageCompression(image3, img3Options);

        const img3Reader = new FileReader();
        const img3Base64Promise = new Promise<string>((resolve) => {
          img3Reader.onloadend = () => resolve(img3Reader.result as string);
          img3Reader.readAsDataURL(compressedImg3);
        });

        const base64Img3 = await img3Base64Promise;

        const img3Filename = `artwork3-${Date.now()}.jpg`;
        const img3UploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Img3, filename: img3Filename, bucketName: 'artworks' }),
        });

        if (img3UploadResponse.ok) {
          const img3UploadData = await img3UploadResponse.json();
          if (img3UploadData.success && img3UploadData.url) {
            image3Url = img3UploadData.url;
            console.log('✅ Image 3 uploaded:', image3Url);
          }
        }
      }

      // 추가 이미지 4 처리
      const existingImage4Url = data.get('existingImage4Url') as string;
      let image4Url: string | undefined = existingImage4Url || undefined;
      const image4 = data.get('image4') as File;

      if (image4) {
        const img4Options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.85,
        };

        const compressedImg4 = await imageCompression(image4, img4Options);

        const img4Reader = new FileReader();
        const img4Base64Promise = new Promise<string>((resolve) => {
          img4Reader.onloadend = () => resolve(img4Reader.result as string);
          img4Reader.readAsDataURL(compressedImg4);
        });

        const base64Img4 = await img4Base64Promise;

        const img4Filename = `artwork4-${Date.now()}.jpg`;
        const img4UploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image: base64Img4, filename: img4Filename, bucketName: 'artworks' }),
        });

        if (img4UploadResponse.ok) {
          const img4UploadData = await img4UploadResponse.json();
          if (img4UploadData.success && img4UploadData.url) {
            image4Url = img4UploadData.url;
            console.log('✅ Image 4 uploaded:', image4Url);
          }
        }
      }

      const title = data.get('title') as string;
      const titleZh = data.get('titleZh') as string;
      const titleEn = data.get('titleEn') as string;
      const description = data.get('description') as string;
      const descriptionZh = data.get('descriptionZh') as string;
      const descriptionEn = data.get('descriptionEn') as string;
      const year = parseInt(data.get('year') as string) || 1900;
      const yearStart = data.get('yearStart') as string;
      const yearEnd = data.get('yearEnd') as string;
      const period = data.get('period') as string;
      const size = data.get('size') as string;

      const updatedItem = {
        title,
        titleZh,
        titleEn,
        description,
        descriptionZh,
        descriptionEn,
        year,
        yearStart,
        yearEnd,
        period,
        size,
        imageUrl,
        image2Url,
        image3Url,
        image4Url,
      };

      console.log('📤 Sending payload to server:', updatedItem);

      const updateResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/artworks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(updatedItem),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const updateData = await updateResponse.json();
      console.log('✅ Server response:', updateData);

      if (updateData.success) {
        await fetchArtworks();
        toast.success('작품이 성공적으로 수정되었습니다!', { id: 'edit' });
        setIsEditModalOpen(false);
        setIsDetailModalOpen(false);
      } else {
        throw new Error(updateData.error || 'Failed to update artwork');
      }
    } catch (error) {
      console.error('❌ Error updating artwork:', error);
      toast.error(`작품 수정 중 오류가 발생했습니다: ${error}`, { id: 'edit' });
    }
  };

  const handleDeleteItem = async (item: AntiqueItem) => {
    if (!confirm('정말로 이 작품을 삭제하시겠습니까?')) {
      return;
    }

    try {
      console.log('🗑️ Deleting artwork:', item.id);
      toast.loading('작품을 삭제하는 중...', { id: 'delete' });

      const deleteResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/artworks/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete artwork');
      }

      const deleteData = await deleteResponse.json();
      console.log('✅ Delete response:', deleteData);

      if (deleteData.success) {
        await fetchArtworks();
        toast.success('작품이 성공적으로 삭제되었습니다!', { id: 'delete' });
        setIsDetailModalOpen(false);
      } else {
        throw new Error(deleteData.error || 'Failed to delete artwork');
      }
    } catch (error) {
      console.error('❌ Error deleting artwork:', error);
      toast.error(`작품 삭제 중 오류가 발생했습니다: ${error}`, { id: 'delete' });
    }
  };

  const handleEdit = (item: AntiqueItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // Get unique years for filtering
  const years = Array.from(new Set(items.map(item => item.year))).sort((a, b) => b - a);

  // Filter items by selected year
  const filteredItems = items;

  // Archive handlers
  const handleAddArchiveItem = async (data: FormData) => {
    try {
      toast.loading('아카이브에 추가 중...', { id: 'archive-add' });

      const type = data.get('type') as 'image' | 'link';
      const title = data.get('title') as string;
      const notes = data.get('notes') as string;

      let imageUrl: string | undefined;
      let linkUrl: string | undefined;
      let linkTitle: string | undefined;
      let linkFavicon: string | undefined;

      if (type === 'image') {
        const image = data.get('image') as File;
        if (!image) {
          toast.error('이미지를 선택해주세요.', { id: 'archive-add' });
          return;
        }

        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: 'image/jpeg',
          initialQuality: 0.8,
        };

        const compressedFile = await imageCompression(image, options);

        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(compressedFile);
        });

        const base64Image = await base64Promise;
        const filename = `archive-${Date.now()}.jpg`;

        const uploadResponse = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/upload-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ base64Image, filename, bucketName: 'archive' }),
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          if (uploadData.success && uploadData.url) {
            imageUrl = uploadData.url;
          }
        }
      } else if (type === 'link') {
        linkUrl = data.get('url') as string;
        if (!linkUrl) {
          toast.error('URL을 입력해주세요.', { id: 'archive-add' });
          return;
        }
        linkTitle = data.get('linkTitle') as string;
        linkFavicon = data.get('linkFavicon') as string;
      }

      const newArchiveItem = {
        id: Date.now().toString(),
        type,
        title: title || undefined,
        imageUrl,
        linkUrl,
        linkTitle,
        linkFavicon,
        notes: notes || undefined,
        createdAt: Date.now(),
      };

      // 서버에 저장
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/archive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(newArchiveItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add archive item');
      }

      const result = await response.json();
      console.log('✅ Archive item added:', result);

      if (result.success) {
        // 서버에서 다시 로드
        await fetchArchiveItems();
        toast.success('아카이브에 추가되었습니다!', { id: 'archive-add' });
        setIsAddArchiveModalOpen(false);
      } else {
        throw new Error(result.error || 'Failed to add archive item');
      }
    } catch (error) {
      console.error('❌ Error adding archive item:', error);
      toast.error('아카이브 추가 중 오류가 발생했습니다.', { id: 'archive-add' });
    }
  };

  const handleEditArchiveItem = (item: ArchiveItem) => {
    // TODO: Implement edit functionality
    console.log('Edit archive item:', item);
  };

  const handleDeleteArchiveItem = async (id: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/archive/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete archive item');
      }

      const result = await response.json();
      console.log('✅ Archive item deleted:', result);

      if (result.success) {
        await fetchArchiveItems();
        toast.success('아카이브 항목이 삭제되었습니다!');
      } else {
        throw new Error(result.error || 'Failed to delete archive item');
      }
    } catch (error) {
      console.error('❌ Error deleting archive item:', error);
      toast.error('아카이브 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleResetArchive = async () => {
    if (window.confirm('정말로 아카이브를 초기화하시겠습니까?')) {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b1fadb3a/archive`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to reset archive');
        }

        const result = await response.json();
        console.log('✅ Archive reset:', result);

        if (result.success) {
          await fetchArchiveItems();
          toast.success('아카이브가 초기화되었습니다!');
        } else {
          throw new Error(result.error || 'Failed to reset archive');
        }
      } catch (error) {
        console.error('❌ Error resetting archive:', error);
        toast.error('아카이브 초기화 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdfcf8' }}>
      <Toaster position="top-center" richColors />

      {showArchive ? (
        /* Archive Page */
        <>
          <header className="sticky top-0 z-40 backdrop-blur-sm" style={{ backgroundColor: 'rgba(165, 235, 250, 0.95)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col gap-4 w-full">
                {/* Row 1: Logo + Title (Side-by-side) */}
                <div className="flex items-center gap-3 w-full">
                  <img
                    src={logo}
                    alt="Yehwa World Logo"
                    className="header-logo"
                    style={{
                      height: '36px',
                      width: '36px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  />
                  <h1 className="text-xl sm:text-3xl font-medium tracking-tight" style={{ fontFamily: "'Playfair Display', 'Noto Serif KR', serif", color: '#1a3a3a' }}>
                    {t.title}
                  </h1>
                </div>

                {/* Row 2: Buttons + Language Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {/* 보관함 버튼 */}
                    <button
                      onClick={() => setShowArchive(!showArchive)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      style={{
                        backgroundColor: '#06b6d4',
                        fontFamily: 'Pretendard, sans-serif'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0891b2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
                    >
                      <Archive className="w-3.5 h-3.5 sm:w-4 h-4" />
                      {t.archive}
                    </button>

                    {!isLoggedIn && (
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors shadow-sm"
                        style={{
                          backgroundColor: '#06b6d4',
                          fontFamily: 'Pretendard, sans-serif'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0891b2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
                      >
                        {t.login}
                      </button>
                    )}
                  </div>
                  <div>
                    <LanguageToggle />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <ArchivePage
            items={archiveItems}
            onAddItem={() => setIsAddArchiveModalOpen(true)}
            onEditItem={handleEditArchiveItem}
            onDeleteItem={handleDeleteArchiveItem}
            isLoggedIn={isLoggedIn}
            onResetArchive={handleResetArchive}
          />
        </>
      ) : (
        /* Main Gallery */
        <>
          <header className="sticky top-0 z-40 backdrop-blur-sm" style={{ backgroundColor: 'rgba(165, 235, 250, 0.95)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col gap-4 w-full">
                {/* Row 1: Logo + Title (Side-by-side) */}
                <div className="flex items-center gap-3 w-full">
                  <img
                    src={logo}
                    alt="Yehwa World Logo"
                    className="header-logo"
                    style={{
                      height: '36px',
                      width: '36px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  />
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight whitespace-nowrap" style={{ fontFamily: "'Playfair Display', 'Noto Serif KR', serif", color: '#1a3a3a' }}>
                    {t.title}
                  </h1>
                </div>

                {/* Row 2: Buttons + Language Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 w-full">
                  <div className="flex items-center gap-2">
                    {/* 보관함 버튼 */}
                    <button
                      onClick={() => setShowArchive(!showArchive)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                      style={{
                        backgroundColor: '#06b6d4',
                        fontFamily: 'Pretendard, sans-serif'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0891b2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
                    >
                      <Archive className="w-3.5 h-3.5 sm:w-4 h-4" />
                      {t.archive}
                    </button>

                    {isLoggedIn ? (
                      <>
                        <button
                          onClick={() => setIsPasswordChangeModalOpen(true)}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                          style={{
                            backgroundColor: '#8b5cf6',
                            fontFamily: 'Pretendard, sans-serif'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
                        >
                          <Settings className="w-3.5 h-3.5 sm:w-4 h-4" />
                          <span className="hidden lg:inline">비밀번호 변경</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors shadow-sm"
                          style={{
                            backgroundColor: '#ef4444',
                            fontFamily: 'Pretendard, sans-serif'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
                        >
                          {t.logout}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition-colors shadow-sm"
                        style={{
                          backgroundColor: '#06b6d4',
                          fontFamily: 'Pretendard, sans-serif'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0891b2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#06b6d4'}
                      >
                        {t.login}
                      </button>
                    )}
                  </div>
                  <div>
                    <LanguageToggle />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-500">{t.loading}</div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-xl text-gray-500">{t.noItems}</div>
              </div>
            ) : (
              <MasonryGrid
                items={filteredItems}
                onItemClick={handleItemClick}
                isLoading={isLoading}
              />
            )}
          </main>

          {/* Admin FAB */}
          {isLoggedIn && (
            <AdminFAB onClick={() => setIsAddModalOpen(true)} />
          )}
        </>
      )
      }

      {/* Modals */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        isLoggedIn={isLoggedIn}
        onEdit={handleEdit}
        onDelete={handleDeleteItem}
      />

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddItem}
      />

      <EditItemModal
        item={selectedItem}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditItem}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <AddArchiveItemModal
        isOpen={isAddArchiveModalOpen}
        onClose={() => setIsAddArchiveModalOpen(false)}
        onSubmit={handleAddArchiveItem}
      />

      <PasswordChangeModal
        isOpen={isPasswordChangeModalOpen}
        onClose={() => setIsPasswordChangeModalOpen(false)}
        onSubmit={handlePasswordChange}
      />

      <Footer />
    </div >
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;