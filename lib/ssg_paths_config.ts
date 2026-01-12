import { SUPPORTED_LANGUAGES } from '../components/LanguageContext';
import { API_CATEGORIES } from '../components/apiExplorers/apiConfig';

/**
 * 生成所有静态路径配置
 * 用于 getStaticPaths
 */
export const getAllStaticPaths = () => {
  const languages = SUPPORTED_LANGUAGES.map(l => l.code);

  const paths: Array<{ params: { slug: string[] } }> = [];

  // 1. 语言首页
  languages.forEach(lang => {
    paths.push({ params: { slug: [lang] } });
  });

  // 2. API Explorer 基础页
  languages.forEach(lang => {
    paths.push({ params: { slug: [lang, 'api_explorer'] } });
  });

  // 3. 所有 API 浏览器页面
  API_CATEGORIES.forEach(category => {
    category.apis.forEach(api => {
      languages.forEach(lang => {
        paths.push({
          params: { slug: [lang, 'api_explorer', api.key] }
        });
      });
    });
  });

  // 4. 政策和其他页面（多语言）
  const staticPages = ['privacy-policy', 'terms-of-service', 'cookie-policy', 'about-us'];
  staticPages.forEach(page => {
    languages.forEach(lang => {
      paths.push({ params: { slug: [lang, page] } });
    });
  });

  return paths;
};

/**
 * 获取所有 API Explorer 的 keys（用于动态匹配）
 */
export const getAllApiExplorerKeys = (): string[] => {
  const keys: string[] = [];

  API_CATEGORIES.forEach(category => {
    category.apis.forEach(api => {
      keys.push(api.key);
    });
  });

  return keys;
};

/**
 * 检查是否是有效的 API Explorer key
 */
export const isValidApiExplorerKey = (key: string): boolean => {
  return getAllApiExplorerKeys().includes(key);
};

