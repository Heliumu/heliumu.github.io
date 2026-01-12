import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Language, LanguageInfo, SupportedLanguages } from '../types';
import { translations } from '../translations';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', label: 'English', nativeLabel: '🇺🇸 English' },
  { code: 'es', label: 'Spanish', nativeLabel: '🇪🇸 Español' },
  { code: 'pt', label: 'Portuguese', nativeLabel: '🇵🇹 Português' },
  { code: 'it', label: 'Italian', nativeLabel: '🇮🇹 Italiano' },
  { code: 'nl', label: 'Dutch', nativeLabel: '🇳🇱 Nederlands' },
  { code: 'de', label: 'German', nativeLabel: '🇩🇪 Deutsch' },
  { code: 'fr', label: 'French', nativeLabel: '🇫🇷 Français' },
  { code: 'ja', label: 'Japanese', nativeLabel: '🇯🇵 日本語' },
  { code: 'ko', label: 'Korean', nativeLabel: '🇰🇷 한국어' },
  { code: 'hi', label: 'Hindi', nativeLabel: '🇮🇳 हिन्दी' },
  { code: 'ar', label: 'Arabic', nativeLabel: '🇸🇦 العربية' },
  { code: 'zh_cn', label: 'Chinese (Simplified)', nativeLabel: '🇨🇳 简体中文' },
  { code: 'zh', label: 'Chinese (Traditional)', nativeLabel: '🇹🇼 繁體中文' },
];

const DEFAULT_LANGUAGE: Language = 'en';
const SUPPORTED_CODES = SUPPORTED_LANGUAGES.map(l => l.code);
const STORAGE_KEY = 'aitrados_language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  withLangPrefix: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper: extract language from router path
export const getLanguageFromPath = (path: string): Language | null => {
  try {
    const seg = path.split('/')[1];
    return SUPPORTED_CODES.includes(seg as Language) ? (seg as Language) : null;
  } catch (e) {
    return null;
  }
};


// Map navigator.language / navigator.languages to our supported language codes
const mapNavigatorLang = (): Language | null => {
  try {
    if (typeof navigator === 'undefined') return null;
    const cand = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    if (!cand) return null;
    const l = cand.toLowerCase();
    // Simplified Chinese cases -> zh_cn
    if (l.startsWith('zh-cn') || l.includes('hans')) return 'zh_cn';
    // Traditional Chinese cases (zh-tw, zh-hk, zh-hant) -> zh
    if (l.startsWith('zh-tw') || l.startsWith('zh-hk') || l.includes('hant')) return 'zh';
    // Plain 'zh' without region: prefer 'zh' (Traditional) by default unless explicitly contains cn
    if (l === 'zh') return 'zh';

    if (l.startsWith('en')) return 'en';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('pt')) return 'pt';
    if (l.startsWith('it')) return 'it';
    if (l.startsWith('nl')) return 'nl';
    if (l.startsWith('de')) return 'de';
    if (l.startsWith('fr')) return 'fr';
    if (l.startsWith('ja')) return 'ja';
    if (l.startsWith('ko')) return 'ko';
    if (l.startsWith('hi')) return 'hi';
    if (l.startsWith('ar')) return 'ar';

    return null;
  } catch (e) {
    return null;
  }
};

const getSavedLanguage = (): Language | null => {
  try {
    if (typeof localStorage === 'undefined') return null;
    const v = localStorage.getItem(STORAGE_KEY);
    return (v && SUPPORTED_CODES.includes(v as Language)) ? (v as Language) : null;
  } catch (e) {
    return null;
  }
};

const saveLanguage = (lang: Language) => {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // ignore
  }
};

const stripLeadingLang = (path: string) => {
  if (!path) return '/';
  const parts = path.split('/');
  if (parts.length > 1 && SUPPORTED_CODES.includes(parts[1] as Language)) {
    parts.splice(1, 1);
    const joined = parts.join('/');
    return joined === '' ? '/' : joined;
  }
  return path.startsWith('/') ? path : `/${path}`;
};

const buildPathWithLang = (rawPath: string, lang: Language) => {
  // preserve hash and search
  let path = rawPath || '/';
  // if rawPath is a full URL, return as-is
  if (/^https?:\/\//.test(path)) return path;
  // if it's only a hash or starts with '#', prefix current path (keep iframe anchors)
  if (path.startsWith('#')) return path;
  // strip existing lang if present
  const noLang = stripLeadingLang(path);
  // avoid double slashes
  const suffix = noLang === '/' ? '' : noLang;
  return `/${lang}${suffix}`;
};

export const LanguageProvider: React.FC<{ children: ReactNode; initialLanguage?: Language | null }> = ({
  children,
  initialLanguage
}) => {
  const router = useRouter();

  // Initialize language with the prop from _app or fallback to default
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage) return initialLanguage;

    // Fallback: try to get from router
    const pathLang = getLanguageFromPath(router.asPath);
    if (pathLang) return pathLang;

    return DEFAULT_LANGUAGE;
  });

  // translation function with fallback to English
  const t = (path: string) => {
    const keys = path.split('.');

    // Try to get translation in current language
    let current: any = translations[language];
    if (current) {
      let found = true;
      for (const key of keys) {
        if (current[key] === undefined) {
          found = false;
          break;
        }
        current = current[key];
      }
      if (found) return current;
    }

    // Fallback to English if not found in current language
    if (language !== DEFAULT_LANGUAGE) {
      let fallback: any = translations[DEFAULT_LANGUAGE];
      for (const key of keys) {
        if (fallback[key] === undefined) return path; // Return path if not even in English
        fallback = fallback[key];
      }
      return fallback;
    }

    // If current language is English and still not found, return path
    return path;
  };

  // Update language when route changes or on mount
  useEffect(() => {
    const pathLang = getLanguageFromPath(router.asPath);

    if (pathLang) {
      if (pathLang !== language) {
        setLanguageState(pathLang);
      }
      return;
    }

    // If no language in path and we're on client, redirect to include language
    if (typeof window !== 'undefined') {
      const saved = getSavedLanguage();
      const navLang = mapNavigatorLang();
      const initial = saved || navLang || DEFAULT_LANGUAGE;

      if (initial !== language) {
        setLanguageState(initial);
      }

      // Canonicalize URL by inserting language
      const { pathname, search, hash } = window.location;
      const newPath = buildPathWithLang(pathname, initial) + (search || '') + (hash || '');
      history.replaceState({}, '', newPath);
    }
  }, [router.asPath]);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    // update URL while preserving the rest of the path, search, and hash
    const { pathname, search, hash } = window.location;
    const newPath = buildPathWithLang(pathname, lang) + (search || '') + (hash || '');
    // push a new history entry so users can go back
    history.pushState({}, '', newPath);
    setLanguageState(lang);
    saveLanguage(lang);
  };

  const withLangPrefix = (path: string) => {
    // helpful for building internal links in components
    return buildPathWithLang(path, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, withLangPrefix }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within a LanguageProvider');
  return context;
};
