// 环境变量配置
// 从 .env.local 中读取配置

export const ENV_CONFIG = {
  // 网站 URL
  WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://www.aitrados.com',

  // 会员中心 URL
  MEMBER_CENTER_URL: process.env.NEXT_PUBLIC_MEMBER_CENTER_URL || 'https://m.aitrados.com',

  DOCS_URL:process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.aitrados.com',

  // 品牌名称
  BRAND_NAME: process.env.NEXT_PUBLIC_BRAND_NAME || 'Aitrados',

  // 组织名称
  ORGANIZATION_NAME: process.env.NEXT_PUBLIC_ORGANIZATION_NAME || 'AITRADOS LLC',

  // Logo 路径
  LOGO: process.env.NEXT_PUBLIC_LOGO || '/images/logo-180x180.png',

  // Logo 图标路径
  LOGO_ICON: process.env.NEXT_PUBLIC_LOGO_ICON || '/images/favicon.ico',

  // Logo 类型: rectangle (长方形，包含品牌名) 或 square (正方形，需要显示品牌名)
  LOGO_TYPE: process.env.NEXT_PUBLIC_LOGO_TYPE || 'rectangle',
} as const;

// 获取登录 URL
export const getLoginUrl = () => {
  return `${ENV_CONFIG.MEMBER_CENTER_URL}/secure/login/`;
};

// 获取注册 URL
export const getSignupUrl = () => {
  return `${ENV_CONFIG.MEMBER_CENTER_URL}/secure/signup/`;
};

export const getPricingUrl = () => {
  return `${ENV_CONFIG.MEMBER_CENTER_URL}/payment/plan`;
};


// 判断是否需要显示品牌名称（正方形 Logo 需要显示）
export const shouldShowBrandName = () => {
  return ENV_CONFIG.LOGO_TYPE === 'square';
};

