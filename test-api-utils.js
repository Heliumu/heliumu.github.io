/**
 * 测试 splicingFullSchemaName 和 getApiBaseUrl 函数
 * 运行: node test-api-utils.js
 */

// 模拟 TypeScript 函数的 JavaScript 版本
const API_BASE_URL = {
  default: "https://default.dataset-api.aitrados.com",
  crypto_global: "https://crypto.dataset-api.aitrados.com",
  forex_global: "https://forex.dataset-api.aitrados.com",
  future_cn: "https://future-cn.dataset-api.aitrados.com",
  future_us: "https://future-us.dataset-api.aitrados.com",
  option_cn: "https://option-cn.dataset-api.aitrados.com",
  option_us: "https://option-us.dataset-api.aitrados.com",
  stock_cn: "https://stock-cn.dataset-api.aitrados.com",
  stock_us: "https://stock-us.dataset-api.aitrados.com"
};

function splicingFullSchemaName(schemaName, countrySymbol) {
  if (!schemaName || !countrySymbol) {
    throw new Error("schema_name 和 country_symbol 都不能为空");
  }

  const parts = countrySymbol.split(':');
  const countryIsoCode = parts.length > 1 ? parts[0] : 'global';

  return `${schemaName}_${countryIsoCode}`.toLowerCase();
}

function getApiBaseUrl(fullSchemaName) {
  return API_BASE_URL[fullSchemaName] || API_BASE_URL.default;
}

// 测试用例
const testCases = [
  { schema: 'crypto', symbol: 'global:btc', expected: 'crypto_global' },
  { schema: 'forex', symbol: 'global:eurusd', expected: 'forex_global' },
  { schema: 'stock', symbol: 'us:spy', expected: 'stock_us' },
  { schema: 'stock', symbol: 'cn:600000', expected: 'stock_cn' },
  { schema: 'future', symbol: 'us:es', expected: 'future_us' },
  { schema: 'future', symbol: 'cn:IF2312', expected: 'future_cn' },
  { schema: 'option', symbol: 'us:spy', expected: 'option_us' },
  { schema: 'option', symbol: 'cn:510050', expected: 'option_cn' },
];

console.log('========================================');
console.log('测试 splicingFullSchemaName 函数');
console.log('========================================\n');

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
  try {
    const result = splicingFullSchemaName(test.schema, test.symbol);
    const isPass = result === test.expected;

    if (isPass) {
      console.log(`✅ 测试 ${index + 1} 通过`);
      console.log(`   输入: schema="${test.schema}", symbol="${test.symbol}"`);
      console.log(`   结果: ${result}`);
      passed++;
    } else {
      console.log(`❌ 测试 ${index + 1} 失败`);
      console.log(`   输入: schema="${test.schema}", symbol="${test.symbol}"`);
      console.log(`   期望: ${test.expected}`);
      console.log(`   实际: ${result}`);
      failed++;
    }
    console.log('');
  } catch (error) {
    console.log(`❌ 测试 ${index + 1} 异常`);
    console.log(`   错误: ${error.message}`);
    console.log('');
    failed++;
  }
});

console.log('========================================');
console.log('测试 getApiBaseUrl 函数');
console.log('========================================\n');

testCases.forEach((test, index) => {
  const fullSchemaName = splicingFullSchemaName(test.schema, test.symbol);
  const url = getApiBaseUrl(fullSchemaName);
  const hasUrl = url !== API_BASE_URL.default || fullSchemaName === 'default';

  console.log(`🔗 测试 ${index + 1}`);
  console.log(`   full_schema_name: ${fullSchemaName}`);
  console.log(`   API Base URL: ${url}`);
  console.log('');
});

// 测试未匹配的情况
console.log('========================================');
console.log('测试未匹配情况（应返回 default URL）');
console.log('========================================\n');

const unmatchedTests = [
  { schema: 'stock', symbol: 'jp:7203' },
  { schema: 'future', symbol: 'eu:DAX' },
];

unmatchedTests.forEach((test, index) => {
  const fullSchemaName = splicingFullSchemaName(test.schema, test.symbol);
  const url = getApiBaseUrl(fullSchemaName);
  const isDefault = url === API_BASE_URL.default;

  console.log(`${isDefault ? '✅' : '❌'} 测试 ${index + 1}`);
  console.log(`   输入: schema="${test.schema}", symbol="${test.symbol}"`);
  console.log(`   full_schema_name: ${fullSchemaName}`);
  console.log(`   返回: ${url}`);
  console.log(`   是否为 default: ${isDefault}`);
  console.log('');
});

console.log('========================================');
console.log(`总结: ${passed} 通过, ${failed} 失败`);
console.log('========================================');

