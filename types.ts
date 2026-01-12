// 支持的语言列表 - 统一定义，其他文件从这里导入
// 顺序：英语优先，其他欧洲语言，亚洲语言，中文系列放最后
export const SupportedLanguages = [
  'en',      // English
  'es',      // Spanish
  'pt',      // Portuguese
  'it',      // Italian
  'nl',      // Dutch
  'de',      // German
  'fr',      // French
  'ja',      // Japanese
  'ko',      // Korean
  'hi',      // Hindi
  'ar',      // Arabic
  'zh_cn',   // Simplified Chinese
  'zh'       // Traditional Chinese
] as const;
export type Language = typeof SupportedLanguages[number];

export interface LanguageInfo {
  code: Language;
  label: string;
  nativeLabel: string;
}



export interface ApiParam {
  name: string;
  in: 'path' | 'query';
  required: boolean;
  type: 'string' | 'integer' | 'boolean' | 'enum' | 'date-time' | 'date' | 'number';
  options?: string[];
  default?: any;
  title?: string;
  tip?: string; // short help text to show inline
  help_url?: string; // optional link to more detailed help
}

export interface ApiEndpoint {
  id: string;
  summary: string;
  path: string;
  method: string;
  parameters: ApiParam[];
}

export interface DatasetItem {
  label: string;
  subItems: string[];
}

export interface DatasetGroup {
  title: string;
  items: DatasetItem[];
}

export const API_BASE_URL: Record<string, string> = {
  default: "https://default.dataset-api.aitrados.com",
  crypto_global: "https://default.dataset-api.aitrados.com",
  forex_global: "https://default.dataset-api.aitrados.com",
  future_cn: "https://default.dataset-api.aitrados.com",
  future_us: "https://default.dataset-api.aitrados.com",
  option_cn: "https://default.dataset-api.aitrados.com",
  option_us: "https://default.dataset-api.aitrados.com",
  stock_cn: "https://default.dataset-api.aitrados.com",
  stock_us: "https://default.dataset-api.aitrados.com"
};
/**
export const API_BASE_URL: Record<string, string> = {
  default: "http://127.0.0.1:1235",
  crypto_global: "http://127.0.0.1:1235",
  forex_global: "http://127.0.0.1:1235",
  future_cn: "http://127.0.0.1:1235",
  future_us: "http://127.0.0.1:1235",
  option_cn: "http://127.0.0.1:1235",
  option_us: "http://127.0.0.1:1235",
  stock_cn: "http://127.0.0.1:1235",
  stock_us: "http://127.0.0.1:1235"
};
    **/

/**
 * 拼接完整的 schema 名称，用于匹配 API_BASE_URL 的 key
 * @param schemaName - 资产类型: crypto, forex, stock, future, option
 * @param countrySymbol - 完整符号格式: country_iso_code:symbol (例如: "us:spy", "global:btc")
 * @returns full_schema_name (例如: "stock_us", "crypto_global")
 */
export function splicingFullSchemaName(schemaName: string, countrySymbol: string): string {
  if (!schemaName || !countrySymbol) {
    throw new Error("schema_name 和 country_symbol 都不能为空");
  }

  // 从 country_symbol 中提取 country_iso_code
  const parts = countrySymbol.split(':');
  const countryIsoCode = parts.length > 1 ? parts[0] : 'global';

  return `${schemaName}_${countryIsoCode}`.toLowerCase();
}

/**
 * 根据 full_schema_name 获取对应的 API Base URL
 * @param fullSchemaName - 完整的 schema 名称 (例如: "stock_us", "crypto_global")
 * @returns API Base URL，如果未找到则返回 default URL
 */
export function getApiBaseUrl(fullSchemaName: string): string {
  return API_BASE_URL[fullSchemaName] || API_BASE_URL.default;
}
