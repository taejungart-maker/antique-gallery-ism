import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    title: 'Antique Gallery',
    subtitle: 'Beauty of Empty Space — The Aesthetics of Space',
    archive: 'Archive',
    gallery: 'Gallery',
    timelineTitle: 'Flow of Time',
    timelineDescription: 'Explore the history of Joseon Dynasty ceramics in chronological order. Click on each piece to view detailed certificates.',
    earlyPeriod: 'Early Joseon',
    latePeriod: 'Late Joseon',
    certificate: 'Certificate',
    authentic: 'Authentic',
    description: 'Description',
    details: 'Details',
    period: 'Period',
    year: 'Year',
    certNumber: 'Certificate No.',
    condition: 'Condition',
    conditionValue: 'Excellent',
    provenance: 'Provenance',
    provenanceText: 'This piece is a precious ceramic crafted using traditional Korean techniques. Its authenticity and cultural value are guaranteed through rigorous examination by experts.',
    certDate: 'Certified: January 2026',
    certOrg: 'K-Antique Gallery Certification Committee',
    adminMode: 'Admin Mode',
    adminDesc: 'Add, edit, or delete artworks',
    newItem: 'New Item',
    about: 'About',
    aboutCert: 'Certification',
    collection: 'Collection',
    contact: 'Contact',
    contactEmail: 'contact@k-antique.gallery',
    copyright: '© 2026 K-Antique Gallery. All rights reserved.',
    seal: 'SEAL',
    items: {
      wk01: {
        title: 'White Porcelain Jar',
        period: 'Early Joseon Dynasty',
        description: 'Pure white porcelain from the early Joseon period. Features elegant curves characteristic of typical white porcelain jars. Its simple and dignified form reflects Confucian ideals.',
      },
      cd02: {
        title: 'Celadon Inlaid Peony Bottle',
        period: 'Mid Joseon Dynasty',
        description: 'A work that continues the tradition of Goryeo celadon. Peony patterns are precisely expressed through inlay techniques. The jade-colored glaze radiates a beautiful luster.',
      },
      pb03: {
        title: 'Blue and White Dragon Jar',
        period: 'Late Joseon Dynasty',
        description: 'White porcelain jar with powerful dragon motifs painted in cobalt blue. High-quality ceramics used by royalty or nobility. Exquisite brushwork.',
      },
      bw04: {
        title: 'Buncheong Ware',
        period: 'Late Joseon Dynasty',
        description: 'Buncheong ware with a folk and warm feeling. Characterized by free-spirited decoration using white slip. Symbolizes the uniqueness of Joseon ceramics.',
      },
      mw05: {
        title: 'White Porcelain Bowl',
        period: 'Late Joseon Dynasty',
        description: 'White porcelain bowl combining practicality and beauty. Deep spirituality within a simple form. Reflects Joseon aesthetic that pursued artistry even in everyday objects.',
      },
      ta06: {
        title: 'Traditional Pattern Jar',
        period: 'Late Joseon Dynasty',
        description: 'Late Joseon Dynasty ceramics. While inheriting traditional patterns and techniques, it possesses unique beauty reflecting the changes of the era.',
      },
    },
  },
  ko: {
    title: '골동품 갤러리',
    subtitle: '여백의 미 — 공간의 아름다움',
    archive: '보관함',
    gallery: '갤러리',
    timelineTitle: '시대의 흐름',
    timelineDescription: '조선시대 도자기의 역사를 시대순으로 감상하실 수 있습니다. 각 작품을 클릭하시면 상세한 감정서를 보실 수 있습니다.',
    earlyPeriod: '조선시대 초기',
    latePeriod: '조선시대 말기',
    certificate: '감정서',
    authentic: '진품',
    description: '작품 설명',
    details: '상세 정보',
    period: '시대',
    year: '제작년도',
    certNumber: '감정번호',
    condition: '상태',
    conditionValue: '최상품',
    provenance: '유래',
    provenanceText: '본 작품은 한국의 전통적인 기법으로 제작된 귀중한 도자기로, 그 진정성과 문화적 가치는 전문가의 엄격한 심사를 통해 보증됩니다.',
    certDate: '감정일: 2026년 1월',
    certOrg: 'K-골동품 갤러리 감정위원회',
    adminMode: '관리자 모드',
    adminDesc: '작품의 추가·편집·삭제가 가능합니다',
    newItem: '새 작품',
    about: '안내',
    aboutCert: '감정 안내',
    collection: '컬렉션',
    contact: '문의하기',
    contactEmail: 'contact@k-antique.gallery',
    copyright: '© 2026 K-골동품 갤러리. All rights reserved.',
    seal: '인',
    items: {
      wk01: {
        title: '백자 호',
        period: '조선시대 초기',
        description: '조선시대 초기의 순백자기. 깨끗하고 우아한 곡선미를 가진 전형적인 백자 호. 유교 이념을 반영한 간소하고 품격있는 조형이 특징입니다.',
      },
      cd02: {
        title: '청자 상감 모란문 병',
        period: '조선시대 중기',
        description: '고려청자의 전통을 계승한 작품. 상감 기법으로 모란 문양을 정밀하게 표현. 비취색 유약이 아름다운 광택을 발합니다.',
      },
      pb03: {
        title: '백자 청화 용문 호',
        period: '조선시대 후기',
        description: '백자에 청화로 힘찬 용 문양을 그린 호. 왕실이나 귀족 계급에서 사용된 고급 도자기. 정교한 붓질이 훌륭합니다.',
      },
      bw04: {
        title: '분청사기',
        period: '조선시대 후기',
        description: '서민적이고 따뜻한 느낌의 분청사기. 백화장토에 의한 자유분방한 장식이 특징. 조선 도자기의 독자성을 상징하는 작품.',
      },
      mw05: {
        title: '백자 발',
        period: '조선시대 말기',
        description: '실용성과 아름다움을 겸비한 백자 발. 단순한 형태 속에 깊은 정신성이 깃들어 있음. 일상 기물에도 예술성을 추구한 조선의 미의식.',
      },
      ta06: {
        title: '전통 문양 호',
        period: '조선시대 말기',
        description: '조선 말기의 도자기. 전통 문양과 기법을 계승하면서도 시대의 변화를 반영한 독특한 아름다움을 지닌 작품.',
      },
    },
  },
  zh: {
    title: '古董画廊',
    subtitle: '余白之美 — 空间的美感',
    archive: '档案',
    gallery: '画廊',
    timelineTitle: '时代的流转',
    timelineDescription: '您可以按时代顺序欣赏朝鲜时代陶瓷的历史。点击每件作品可查看详细的鉴定书。',
    earlyPeriod: '朝鲜时代初期',
    latePeriod: '朝鲜时代末期',
    certificate: '鉴定书',
    authentic: '真品',
    description: '作品说明',
    details: '详细信息',
    period: '时代',
    year: '制作年份',
    certNumber: '鉴定编号',
    condition: '状态',
    conditionValue: '极品',
    provenance: '来历',
    provenanceText: '本作品是采用韩国传统技法制作的珍贵陶瓷，其真实性和文化价值经过专家严格审查得到保证。',
    certDate: '鉴定日期：2026年1月',
    certOrg: 'K-古董画廊鉴定委员会',
    adminMode: '管理员模式',
    adminDesc: '可以添加、编辑和删除作品',
    newItem: '新作品',
    about: '指南',
    aboutCert: '鉴定指南',
    collection: '收藏品',
    contact: '联系方式',
    contactEmail: 'contact@k-antique.gallery',
    copyright: '© 2026 K-古董画廊。版权所有。',
    seal: '印',
    items: {
      wk01: {
        title: '白瓷壶',
        period: '朝鲜时代初期',
        description: '朝鲜时代初期的纯白瓷器。具有清洁优雅曲线美的典型白瓷壶。体现儒教理念的简约而高雅的造型是其特征。',
      },
      cd02: {
        title: '青瓷镶嵌牡丹纹瓶',
        period: '朝鲜时代中期',
        description: '继承高丽青瓷传统的作品。通过镶嵌技法精密表现牡丹纹样。翡翠色釉药散发美丽光泽。',
      },
      pb03: {
        title: '白瓷青花龙纹壶',
        period: '朝鲜时代后期',
        description: '在白瓷上用青花绘制雄壮龙纹样的壶。王室或贵族阶层使用的高级陶瓷。精致的笔触令人赞叹。',
      },
      bw04: {
        title: '粉青沙器',
        period: '朝鲜时代后期',
        description: '具有平民气息和温暖感的粉青沙器。白化妆土带来的自由奔放装饰是其特征。象征朝鲜陶瓷独特性的作品。',
      },
      mw05: {
        title: '白瓷钵',
        period: '朝鲜时代末期',
        description: '兼具实用性和美观性的白瓷钵。简约形态中蕴含深厚精神性。体现朝鲜在日常器物中追求艺术性的美学意识。',
      },
      ta06: {
        title: '传统纹样壶',
        period: '朝鲜时代末期',
        description: '朝鲜末期的陶瓷。继承传统纹样和技法的同时，反映时代变化的独特美感作品。',
      },
    },
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}