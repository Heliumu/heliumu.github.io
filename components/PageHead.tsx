import Head from 'next/head';
import { useTranslation } from './LanguageContext';

interface PageHeadProps {
  pageTitle?: string;  // 子页面标题，如果提供则格式为 "子页面标题 - 网站标题"
  pageKey?: string;    // API key，用于从翻译中获取标题
}

/**
 * 页面 Head 组件
 * 用于设置页面标题、关键词和描述
 *
 * 使用方式：
 * <PageHead /> - 使用默认网站标题
 * <PageHead pageTitle="自定义标题" /> - 自定义标题 + 网站标题
 * <PageHead pageKey="quickstart" /> - 从翻译中获取标题
 */
export const PageHead: React.FC<PageHeadProps> = ({ pageTitle, pageKey }) => {
  const { t } = useTranslation();

  // 获取网站基本信息
  const websiteTitle = t('website.title');
  const websiteKeywords = t('website.keywords');
  const websiteDescription = t('website.description');

  // 构建完整标题
  let fullTitle = websiteTitle;

  if (pageKey) {
    // 从翻译中获取标题
    const explorerTitle = t(`explorer.titles.${pageKey}`);
    fullTitle = `${explorerTitle} - ${websiteTitle}`;
  } else if (pageTitle) {
    // 使用提供的标题
    fullTitle = `${pageTitle} - ${websiteTitle}`;
  }

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="keywords" content={websiteKeywords} />
      <meta name="description" content={websiteDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={websiteDescription} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={websiteDescription} />
    </Head>
  );
};

