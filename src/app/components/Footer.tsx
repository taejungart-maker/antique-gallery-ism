import { useLanguage } from '@/app/components/LanguageContext';
// import logo from 'figma:asset/4e1a48f78f9fd87c0aeb77a6d7323e74507da152.png';
const logo = "/logo_yehwa.jpg";

export function Footer() {
  const { language } = useLanguage();

  const translations = {
    ko: {
      gallery: '예화월드',
      address: '',
      contact: '연락처',
      phone: '전화',
      phoneNumber: '010-8292-6663',
      email: '이메일',
      emailAddress: 'Smm10280@naver.com',
      website: '웹사이트',
      websiteUrl: 'https://yehwa-world.figma.site',
      services: '서비스',
      appraisal: '감정 서비스',
      consignment: '위탁 판매',
      consultation: '전문가 상담',
      copyright: '© 2026 Yehwa World. All rights reserved.',
    },
    zh: {
      gallery: '艺华世界',
      address: '',
      contact: '联系方式',
      phone: '电话',
      phoneNumber: '010-8292-6663',
      email: '邮箱',
      emailAddress: 'Smm10280@naver.com',
      website: '网站',
      websiteUrl: 'https://yehwa-world.figma.site',
      services: '服务',
      appraisal: '鉴定服务',
      consignment: '寄售',
      consultation: '专家咨询',
      copyright: '© 2026 艺华世界。版权所有。',
    },
    en: {
      gallery: 'Yehwa World',
      address: '',
      contact: 'Contact',
      phone: 'Phone',
      phoneNumber: '010-8292-6663',
      email: 'Email',
      emailAddress: 'Smm10280@naver.com',
      website: 'Website',
      websiteUrl: 'https://yehwa-world.figma.site',
      services: 'Services',
      appraisal: 'Appraisal Service',
      consignment: 'Consignment Sales',
      consultation: 'Expert Consultation',
      copyright: '© 2026 Yehwa World. All rights reserved.',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <footer className="mt-5 border-t" style={{ backgroundColor: '#fdfcf8', borderColor: '#e5e7eb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Gallery Info */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Yehwa World Logo"
                className="footer-logo"
                style={{
                  width: '36px',
                  height: '36px',
                  minWidth: '36px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              />
              <h3 className="text-xl font-normal" style={{ fontFamily: "'Playfair Display', 'Noto Serif KR', serif", color: '#1a3a3a' }}>
                {t.gallery}
              </h3>
            </div>
            {/* 주소 정보 삭제 */}
          </div>

          {/* Column 2: Contact */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-normal mb-6" style={{ fontFamily: "'Playfair Display', 'Noto Serif KR', serif", color: '#1a3a3a' }}>
              {t.contact}
            </h4>
            <div className="space-y-4 text-sm" style={{ color: '#4a5568', fontFamily: 'Pretendard, sans-serif' }}>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#9ca3af' }}>{t.phone}</p>
                <p className="text-gray-700 font-medium">{t.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#9ca3af' }}>{t.email}</p>
                <p className="text-gray-700 font-medium">{t.emailAddress}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#9ca3af' }}>{t.website}</p>
                <p>
                  <a href="/" className="text-gray-700 font-medium hover:text-cyan-600 transition-colors">
                    {t.websiteUrl}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col items-start">
            <h4 className="text-lg font-normal mb-6" style={{ fontFamily: "'Playfair Display', 'Noto Serif KR', serif", color: '#1a3a3a' }}>
              {t.services}
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: '#4a5568', fontFamily: 'Pretendard, sans-serif' }}>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#06b6d4' }}></span>
                <span className="text-gray-700 font-medium">{t.appraisal}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#06b6d4' }}></span>
                <span className="text-gray-700 font-medium">{t.consignment}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#06b6d4' }}></span>
                <span className="text-gray-700 font-medium">{t.consultation}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t text-center text-xs tracking-wide" style={{ borderColor: '#f3f4f6', color: '#9ca3af', fontFamily: 'Pretendard, sans-serif' }}>
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}