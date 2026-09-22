declare global {
  interface Window {
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized?: () => boolean;
      Share?: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.0/kakao.min.js';

let kakaoLoadPromise: Promise<typeof window.Kakao | null> | null = null;

export async function loadKakaoSdk(appKey: string) {
  if (!appKey) return null;
  if (window.Kakao?.Share) {
    if (!window.Kakao.isInitialized?.()) {
      window.Kakao.init(appKey);
    }
    return window.Kakao;
  }

  if (!kakaoLoadPromise) {
    kakaoLoadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${KAKAO_SDK_URL}"]`);
      if (existing) {
        existing.addEventListener('load', () => {
          if (window.Kakao && !window.Kakao.isInitialized?.()) {
            window.Kakao.init(appKey);
          }
          resolve(window.Kakao || null);
        });
        existing.addEventListener('error', () => reject(new Error('카카오 SDK를 불러오지 못했습니다.')));
        return;
      }

      const script = document.createElement('script');
      script.src = KAKAO_SDK_URL;
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized?.()) {
          window.Kakao.init(appKey);
        }
        resolve(window.Kakao || null);
      };
      script.onerror = () => reject(new Error('카카오 SDK를 불러오지 못했습니다.'));
      document.head.appendChild(script);
    });
  }

  return kakaoLoadPromise;
}

export async function shareTextToKakao(appKey: string, text: string, url: string) {
  const kakao = await loadKakaoSdk(appKey);
  if (!kakao?.Share) {
    throw new Error('카카오톡 공유를 사용하려면 JavaScript 키 설정이 필요합니다.');
  }

  kakao.Share.sendDefault({
    objectType: 'text',
    text,
    link: {
      mobileWebUrl: url,
      webUrl: url
    },
    buttonTitle: '링크 열기'
  });
}
