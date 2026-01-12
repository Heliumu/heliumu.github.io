// scripts/generate-api-config.js
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// ES Module 中获取 __dirname 的方法
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载 .env.local 配置
config({ path: path.join(__dirname, '../.env.local') });

// 配置你的 OpenAPI 地址 - 从环境变量读取，如果没有则使用默认值
const OPENAPI_URL = process.env.NEXT_PUBLIC_OPENAPI_URL || 'https://default.dataset-api.aitrados.com/openapi.json';
const OUTPUT_FILE = path.join(__dirname, '../components/apiExplorers/api_endpoints.ts');

// 从环境变量读取网站配置
const MEMBER_CENTER_URL = process.env.NEXT_PUBLIC_MEMBER_CENTER_URL || 'https://m.aitrados.com';
const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.aitrados.com';




// 辅助函数：为特定字段设置自定义 tip 和 help_url
function set_tip_and_help_url(field_name, id = null) {
  // 可以根据字段名和 endpoint ID 的组合返回自定义提示
  const customHelp = {
    // 通用字段提示（适用于所有接口）

    'secret_key': {
      tip: 'Signup to gain free secret_key',
      help_url: `${MEMBER_CENTER_URL}/secure/signup/`
    },
    'parent_full_symbol':{
      tip: 'asset_schema:country_iso_code:symbol',
      help_url: `${DOCS_URL}/en/docs/api/terminology/full_symbol/`
    },
    'full_symbol':{
      tip: 'asset_schema:country_iso_code:symbol',
      help_url: `${DOCS_URL}/en/docs/api/terminology/full_symbol/`
    },
    'country_symbol':{
      tip: 'country_iso_code:symbol',
      help_url: `${DOCS_URL}/en/docs/api/terminology/country_symbol/`
    },
    'format': {
      tip: 'Response format: json or csv'
    },
    'limit': {
      tip: 'Maximum number of records to return',
    },
    'sort': {
      tip: 'Sort order: asc (ascending) or desc (descending)',
    },
    'from_date': {
      tip: 'Start date for data range (ISO 8601 format)',
    },
    'to_date': {
      tip: 'End date for data range (ISO 8601 format)',
    },
    'next_page_key': {
      tip: 'Token for pagination - get next page of results',
    },
    'action_type': {
      tip: "'dividend' or 'split' or none",
    },
    'is_eth': {
      tip: "only for US stock extended trading",
    },



    // 特定接口+字段的组合（更精确的提示）
    'interval': {
      tip: 'Time interval for bars',
      help_url: `${DOCS_URL}/en/docs/api/terminology/interval/`
    },
    'adjusted': {
      tip: 'Whether to adjust prices for splits and dividends',
    },
    'country_iso_code': {
      tip: 'Country code (e.g., US, CN, JP,GLOBAL)',
      help_url: `${DOCS_URL}/en/docs/api/terminology/country_symbol/`
    }
  };

  // 优先匹配：字段名 + ID 组合
  if (id) {
    const compositeKey = `${field_name}:${id}`;
    if (customHelp[compositeKey]) {
      return customHelp[compositeKey];
    }
  }

  // 其次匹配：仅字段名
  if (customHelp[field_name]) {
    return customHelp[field_name];
  }

  // 默认返回空对象
  return {};
}

// 辅助函数：解析 $ref 引用
function resolveRef(ref, spec) {
  if (!ref || !ref.startsWith('#/')) return null;

  const path = ref.replace('#/', '').split('/');
  let current = spec;

  for (const segment of path) {
    if (!current[segment]) return null;
    current = current[segment];
  }

  return current;
}

// 辅助函数：从 schema 中提取枚举值（支持 $ref）
function extractEnum(schema, spec) {
  if (!schema) return null;

  // 直接有 enum
  if (schema.enum && Array.isArray(schema.enum)) {
    return schema.enum;
  }

  // 通过 $ref 引用
  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, spec);
    if (resolved && resolved.enum && Array.isArray(resolved.enum)) {
      return resolved.enum;
    }
  }

  return null;
}

// 辅助函数：从 schema 中提取 title（支持 $ref）
function extractTitle(schema, spec) {
  if (!schema) return null;

  // 直接有 title
  if (schema.title) {
    return schema.title;
  }

  // 通过 $ref 引用
  if (schema.$ref) {
    const resolved = resolveRef(schema.$ref, spec);
    if (resolved && resolved.title) {
      if (resolved.title==="SchemaEnum")
        return "Asset Schema"
      if (resolved.title==="OptionTypeEnum")
        return "Option Type"
      if (resolved.title==="MoneyNessEnum")
        return "MoneyNess"


      if (resolved.title==="OhlcFormat")
        return "Format"
      if (resolved.title==="BarInterval")
        return "Interval(TimeFrame)"
      if (resolved.title==="SortDirection")
        return "Sort"



      return resolved.title;
    }
  }

  return null;
}

// 辅助函数：将 OpenAPI 类型转换为你的前端类型
function mapType(param, spec) {
  const schema = param.schema || {};

  // 检查是否有枚举（包括 $ref 引用的）
  const enumValues = extractEnum(schema, spec);
  if (enumValues && enumValues.length > 0) return 'enum';



  if (schema.type === 'boolean') return 'boolean';
  if (schema.type === 'integer' || schema.type === 'number') return 'integer';
  if (schema.format === 'date-time' || schema.format === 'date' || param.name==="from_date" || param.name==="to_date") return 'date-time';
  return 'string';
}

function toSnakeCase(str) {
  return str
    .trim()
    .replace(/\s+/g, '_')  // 空格转下划线
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)  // 大写字母前加下划线并转小写
    .replace(/^_/, '')  // 移除开头的下划线
    .replace(/__+/g, '_');  // 多个下划线合并为一个
}

// 辅助函数：生成唯一的 ID
function generateId(summary, path) {
  // 优先使用 FastAPI 的 summary 转换为 snake_case (例如: "Holiday Codes" -> "holiday_codes")
  if (summary) return toSnakeCase(summary);
  // 降级策略：从路径生成 (例如: /api/v2/news/latest -> api_v2_news_latest)
  return path.replace(/^\//, '').replace(/\//g, '_').replace(/{|}/g, '');
}

async function fetchOpenApi() {
  return new Promise((resolve, reject) => {
    // 根据 URL 协议选择合适的模块
    const protocol = OPENAPI_URL.startsWith('https://') ? https : http;

    protocol.get(OPENAPI_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function generate() {
  console.log(`Fetching OpenAPI from ${OPENAPI_URL}...`);

  try {
    const spec = await fetchOpenApi();
    const endpoints = {}; // 使用对象字典，满足你 "检索快" 的需求

    // 遍历 Paths
    Object.entries(spec.paths).forEach(([pathKey, methods]) => {
      Object.entries(methods).forEach(([method, operation]) => {
        // 你的前端只关心 GET 请求用于展示，可以根据需要过滤
        if (method.toUpperCase() !== 'GET') return;

        const id = generateId(operation.summary, pathKey);

        // 处理参数 - 过滤掉 debug 参数
        const parameters = (operation.parameters || [])
          .filter(param => param.name !== 'debug' & param.name !== 'url')
          .map(param => {
            const schema = param.schema || {};

            // 获取自定义提示和帮助链接
            const customHelp = set_tip_and_help_url(param.name, id);

            // 提取枚举值（支持 $ref 引用）
            const enumValues = extractEnum(schema, spec);

            // 提取 title（支持 $ref 引用）
            const title = extractTitle(schema, spec);

            const p = {
              name: param.name,
              in: param.in,
              required: param.required || false,
              type: mapType(param, spec),
              // 处理默认值
              default: schema.default !== undefined ? schema.default : undefined,
              // 处理枚举选项 - 支持 $ref 引用
              options: enumValues || undefined,
              // 处理 title
              title: title || undefined,
              // 处理描述/提示 - 优先使用自定义 tip，其次使用 OpenAPI 的 description
              tip: customHelp.tip || param.description || undefined,
              // 添加帮助链接
              help_url: customHelp.help_url || undefined,
            };

            // 移除 undefined 属性以减小文件体积
            Object.keys(p).forEach(key => p[key] === undefined && delete p[key]);
            return p;
          });

        endpoints[id] = {
          id: id,
          summary: operation.summary || id,
          path: pathKey,
          method: method.toUpperCase(),
          parameters: parameters
        };
      });
    });

    // 生成 TypeScript 代码
    const fileContent = `// This file is auto-generated by scripts/generate-api-config.js
// Do not edit manually. 
import { ApiEndpoint } from '@/types.ts';

export const API_ENDPOINTS: Record<string, ApiEndpoint> = ${JSON.stringify(endpoints, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`✅ Successfully generated API config at ${OUTPUT_FILE}`);
    console.log(`📊 Total endpoints: ${Object.keys(endpoints).length}`);

  } catch (error) {
    console.error('❌ Error generating API config:', error);
    process.exit(1);
  }
}

generate();