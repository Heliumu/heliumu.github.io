#!/usr/bin/env node
/**
 * Generate sitemap.xml for static export
 * 为静态导出生成 sitemap.xml
 */

const { writeFileSync } = require('fs');
const path = require('path');

// 从 types.ts 导入支持的语言列表
// 注意：由于这是 CommonJS，我们直接复制定义
// 如果需要同步，请修改 types.ts 中的 SupportedLanguages
const SUPPORTED_LANGUAGES = ['en', 'es', 'pt', 'it', 'nl', 'de', 'fr', 'ja', 'ko', 'hi', 'ar', 'zh_cn', 'zh'];

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://api.aitrados.com';

// API分类配置（从apiConfig.ts复制）
const API_CATEGORIES = [
  {
    key: 'quickstart',
    apis: [{ key: 'quickstart' }]
  },
  {
    key: 'crypto',
    apis: [
      { key: 'ohlc_latest_bars__crypto' },
      { key: 'ohlc_history_bars__crypto' },
      { key: 'asset_reference__crypto' }
    ]
  },
  {
    key: 'forex',
    apis: [
      { key: 'ohlc_latest_bars__forex' },
      { key: 'ohlc_history_bars__forex' },
      { key: 'asset_reference__forex' }
    ]
  },
  {
    key: 'stock',
    apis: [
      { key: 'ohlc_latest_bars__stock' },
      { key: 'ohlc_history_bars__stock' },
      { key: 'asset_reference__stock' },
      { key: 'stock_corporate_action_list' }
    ]
  },
  {
    key: 'future',
    apis: [
      { key: 'ohlc_latest_bars__future' },
      { key: 'ohlc_history_bars__future' },
      { key: 'asset_reference__future' },
      { key: 'futures_continuous_real_contracts' },
      { key: 'futures_active_rank_real_symbol' },
      { key: 'futures_tradable_symbols' }
    ]
  },
  {
    key: 'option',
    apis: [
      { key: 'ohlc_latest_bars__option' },
      { key: 'ohlc_history_bars__option' },
      { key: 'asset_reference__option' },
      { key: 'search_options' },
      { key: 'options_expiration_date_list' }
    ]
  },
  {
    key: 'economic_calendar',
    apis: [
      { key: 'economic_calendar_event_list' },
      { key: 'economic_calendar_latest_event_list' },
      { key: 'economic_calendar_event' },
      { key: 'economic_calendar_event_codes' }
    ]
  },
  {
    key: 'news',
    apis: [
      { key: 'news_list' },
      { key: 'news_latest' }
    ]
  },
  {
    key: 'holiday',
    apis: [
      { key: 'holiday_list' },
      { key: 'holiday_codes' }
    ]
  },
  {
    key: 'other',
    apis: [
      { key: 'address_info' }
    ]
  }
];

// 页面优先级配置
const PRIORITY_MAP = {
  '/': 1.0,                    // 首页最高优先级
  '/api_explorer': 0.9,        // API浏览器基础页
  '/about-us': 0.8,           // About Us页面
  '/privacy-policy': 0.5,      // 政策页面
  '/terms-of-service': 0.5,
  '/cookie-policy': 0.5,
};

// 更新频率配置
const CHANGE_FREQ_MAP = {
  '/': 'daily',
  '/api_explorer': 'weekly',
  '/about-us': 'monthly',
  '/privacy-policy': 'yearly',
  '/terms-of-service': 'yearly',
  '/cookie-policy': 'yearly',
};

function getPriority(url) {
  // 首页
  if (url.match(/^\/[a-z_]+$/)) return 1.0;

  // 精确匹配
  const path = url.split('/').slice(2).join('/');
  if (path && PRIORITY_MAP[`/${path}`]) {
    return PRIORITY_MAP[`/${path}`];
  }

  // API浏览器页面
  if (url.includes('/api_explorer/')) return 0.7;

  // 默认优先级
  return 0.6;
}

function getChangeFreq(url) {
  // 首页
  if (url.match(/^\/[a-z_]+$/)) return 'daily';

  // 精确匹配
  const path = url.split('/').slice(2).join('/');
  if (path && CHANGE_FREQ_MAP[`/${path}`]) {
    return CHANGE_FREQ_MAP[`/${path}`];
  }

  // API浏览器页面
  if (url.includes('/api_explorer/')) return 'weekly';

  // 默认频率
  return 'monthly';
}

function getAllPaths() {
  const paths = [];

  SUPPORTED_LANGUAGES.forEach(lang => {
    // 1. 语言首页
    paths.push(`/${lang}`);

    // 2. API Explorer 基础页
    paths.push(`/${lang}/api_explorer`);

    // 3. 所有 API 页面
    API_CATEGORIES.forEach(category => {
      category.apis.forEach(api => {
        paths.push(`/${lang}/api_explorer/${api.key}`);
      });
    });

    // 4. 静态页面
    ['privacy-policy', 'terms-of-service', 'cookie-policy', 'about-us'].forEach(page => {
      paths.push(`/${lang}/${page}`);
    });
  });

  return paths;
}

function generateSitemap() {
  console.log('🗺️  开始生成 sitemap.xml...');

  // 获取所有路径
  const urls = getAllPaths();

  console.log(`📊 找到 ${urls.length} 个页面`);

  // 生成 sitemap XML
  const lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => {
  const fullUrl = `${WEBSITE_URL}${url}`;
  const priority = getPriority(url);
  const changefreq = getChangeFreq(url);
  
  return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  // 写入文件
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  writeFileSync(outputPath, sitemap);
  console.log('✅ sitemap.xml 已生成到 public/sitemap.xml');

  // 生成统计信息
  console.log('\n📈 统计信息:');
  console.log(`   总URL数: ${urls.length}`);
  console.log(`   网站地址: ${WEBSITE_URL}`);
  console.log(`   最后更新: ${lastmod}`);

  // 按语言统计
  SUPPORTED_LANGUAGES.forEach(lang => {
    const count = urls.filter(url => url.startsWith(`/${lang}`)).length;
    console.log(`   ${lang}: ${count} 个页面`);
  });
}

// 执行生成
try {
  generateSitemap();
} catch (error) {
  console.error('❌ 生成 sitemap 失败:', error);
  process.exit(1);
}

