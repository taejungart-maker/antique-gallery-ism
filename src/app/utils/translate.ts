// 무료 Google Translate API를 사용한 간단한 번역 함수
export async function translateText(text: string, targetLang: 'zh' | 'en'): Promise<string> {
  try {
    // MyMemory Translation API 사용 (무료, CORS 지원)
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${targetLang === 'zh' ? 'zh-CN' : 'en'}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Translation API request failed');
    }
    
    const data = await response.json();
    
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    
    throw new Error('Translation response invalid');
  } catch (error) {
    console.error('Translation error:', error);
    // 번역 실패 시 원본 텍스트 반환
    return text;
  }
}

// 여러 줄의 텍스트를 번역 (설명 등)
export async function translateMultiline(text: string, targetLang: 'zh' | 'en'): Promise<string> {
  try {
    // 긴 텍스트는 전체를 한 번에 번역
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|${targetLang === 'zh' ? 'zh-CN' : 'en'}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Translation API request failed');
    }
    
    const data = await response.json();
    
    if (data && data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    }
    
    throw new Error('Translation response invalid');
  } catch (error) {
    console.error('Multiline translation error:', error);
    return text;
  }
}