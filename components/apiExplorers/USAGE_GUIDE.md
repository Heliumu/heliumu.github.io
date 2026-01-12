# CommonExplorerInterface 使用文档

## 概述

`CommonExplorerInterface` 是一个通用的 API Explorer 组件，可以通过简单配置快速创建任何 API 端点的交互式界面。

## 核心特性

1. **自动表单生成** - 根据 `api_endpoints.ts` 中的配置自动生成表单字段
2. **动态 Base URL** - 根据 `asset_schema` 和 `country_symbol` 自动选择正确的 API 服务器地址
3. **灵活配置** - 支持追加、删除和自定义默认值

## Props 参数

### endpointId (必填)
- **类型**: `string`
- **说明**: API 端点的 ID，必须在 `api_endpoints.ts` 的 `API_ENDPOINTS` 中定义
- **示例**: `"ohlc_latest_bars"`, `"ohlc_history_bars"`

### appendFormFields (可选)
- **类型**: `ApiParam[]`
- **说明**: 追加额外的表单字段。如果字段名已存在，会覆盖原有配置
- **示例**:
```typescript
const appendFormFields: ApiParam[] = [
  {
    name: "custom_api_key",
    in: "query",
    required: true,
    type: "string",
    title: "Custom API Key",
    tip: "Your custom API key",
    help_url: "https://docs.example.com/auth"
  }
];
```

### deleteFormFields (可选)
- **类型**: `string[]`
- **说明**: 要删除的字段名数组
- **示例**: `["adjusted", "is_eth"]`

### customDefaultValues (可选)
- **类型**: `Record<string, any>`
- **说明**: 自定义表单字段的默认值
- **示例**:
```typescript
const customDefaultValues = {
  asset_schema: "crypto",
  country_symbol: "global:btc",
  interval: "DAY",
  limit: 100
};
```

## 使用示例

### 示例 1: 基础使用

```typescript
import CommonExplorerInterface from './CommonExplorerInterface';

const MyApiExplorer = () => {
  return (
    <CommonExplorerInterface
      endpointId="ohlc_latest_bars"
    />
  );
};
```

### 示例 2: 删除不需要的字段

```typescript
import CommonExplorerInterface from './CommonExplorerInterface';

const MyApiExplorer = () => {
  return (
    <CommonExplorerInterface
      endpointId="ohlc_latest_bars"
      deleteFormFields={["adjusted", "is_eth", "format"]}
    />
  );
};
```

### 示例 3: 追加自定义字段

```typescript
import CommonExplorerInterface from './CommonExplorerInterface';
import { ApiParam } from '@/types';

const MyApiExplorer = () => {
  const appendFormFields: ApiParam[] = [
    {
      name: "api_version",
      in: "query",
      required: false,
      type: "enum",
      options: ["v1", "v2", "v3"],
      default: "v2",
      title: "API Version",
      tip: "Select the API version to use"
    }
  ];

  return (
    <CommonExplorerInterface
      endpointId="ohlc_latest_bars"
      appendFormFields={appendFormFields}
    />
  );
};
```

### 示例 4: 完整配置（推荐）

```typescript
import React from 'react';
import CommonExplorerInterface from './CommonExplorerInterface';
import { ApiParam } from '@/types';

type AssetSchema = 'crypto' | 'forex' | 'stock' | 'future' | 'option';

interface Props {
  assetSchema?: AssetSchema;
}

const ASSET_META: Record<AssetSchema, { defaultSymbol: string; intervals: string[] }> = {
  crypto: { defaultSymbol: 'global:btc', intervals: ['1M','5M','15M','60M','DAY'] },
  forex: { defaultSymbol: 'global:eurusd', intervals: ['1M','5M','15M','60M','DAY'] },
  stock: { defaultSymbol: 'us:spy', intervals: ['DAY','60M','30M','15M','5M','1M'] },
  future: { defaultSymbol: 'us:es', intervals: ['DAY','60M','30M','15M'] },
  option: { defaultSymbol: 'us:spy', intervals: ['DAY'] },
};

const OhlcLatestExplorer: React.FC<Props> = ({ assetSchema = 'stock' }) => {
  const meta = ASSET_META[assetSchema];

  // 追加自定义字段
  const appendFormFields: ApiParam[] = [
    {
      name: 'user_id',
      in: 'query',
      required: false,
      type: 'string',
      title: 'User ID',
      tip: 'Optional user identifier for tracking'
    }
  ];

  // 删除不需要的字段
  const deleteFormFields = ['adjusted', 'is_eth'];

  // 自定义默认值
  const customDefaultValues = {
    asset_schema: assetSchema,
    country_symbol: meta.defaultSymbol,
    interval: meta.intervals[0],
    secret_key: 'your-secret-key-here',
    sort: 'desc',  // 覆盖默认排序
    limit: 200,    // 覆盖默认限制
    format: 'json'
  };

  return (
    <CommonExplorerInterface
      endpointId="ohlc_latest_bars"
      appendFormFields={appendFormFields}
      deleteFormFields={deleteFormFields}
      customDefaultValues={customDefaultValues}
    />
  );
};

export default OhlcLatestExplorer;
```

## 工作原理

### 1. 动态 Base URL 解析

组件使用 `splicingFullSchemaName()` 函数根据 `asset_schema` 和 `country_symbol` 动态确定 API Base URL：

```typescript
// country_symbol 格式: country_iso_code:symbol
// 例如: "us:spy", "global:btc", "cn:600000"

const fullSchemaName = splicingFullSchemaName("stock", "us:spy");
// 返回: "stock_us"

const baseUrl = getApiBaseUrl(fullSchemaName);
// 从 API_BASE_URL 中查找 "stock_us" 对应的 URL
// 如果未找到，返回 default URL
```

### 2. 参数合并逻辑

```typescript
// 1. 从 API_ENDPOINTS[endpointId] 加载原始参数
// 2. 过滤掉 deleteFormFields 中的字段
// 3. 追加 appendFormFields（同名字段会覆盖）
// 4. 应用 customDefaultValues 作为初始值
```

### 3. country_symbol 格式规范

- **格式**: `country_iso_code:symbol`
- **数字货币**: `global:btc`, `global:eth`
- **外汇**: `global:eurusd`, `global:gbpusd`
- **美股**: `us:spy`, `us:aapl`
- **中国股票**: `cn:600000`, `cn:000001`
- **期货**: `us:es`, `cn:IF2312`
- **期权**: `us:spy`, `us:aapl`

## 添加新的 API Explorer

### 步骤 1: 确保 API 配置存在

确保你的 API 端点已在 `api_endpoints.ts` 中定义。如果没有，运行脚本生成：

```bash
node scripts/generate-api-config.js
```

### 步骤 2: 创建 Explorer 组件

```typescript
import React from 'react';
import CommonExplorerInterface from './CommonExplorerInterface';

const MyNewApiExplorer = () => {
  return (
    <CommonExplorerInterface
      endpointId="your_endpoint_id"
      deleteFormFields={["field1", "field2"]}
      customDefaultValues={{
        param1: "value1",
        param2: "value2"
      }}
    />
  );
};

export default MyNewApiExplorer;
```

### 步骤 3: 在 ExplorerShell 中注册

编辑 `ExplorerShell.tsx`，添加路由逻辑：

```typescript
const renderRight = () => {
  if (selected === 'my_new_api') {
    return <MyNewApiExplorer />;
  }
  // ...其他路由
};
```

### 步骤 4: 在 ApiList 中添加菜单项

编辑 `ApiList.tsx`，添加菜单项：

```typescript
const items: Item[] = [
  { key: 'quickstart', label: 'Quickstart' },
  { key: 'my_new_api', label: 'My New API' },
  // ...其他菜单
];
```

## 高级用法

### 覆盖特定字段配置

使用 `appendFormFields` 可以完全覆盖原有字段的配置：

```typescript
const appendFormFields: ApiParam[] = [
  {
    name: "interval",  // 覆盖原有的 interval 字段
    in: "path",
    required: true,
    type: "enum",
    options: ["DAY", "60M", "30M"],  // 限制可选项
    default: "DAY",
    title: "时间间隔",
    tip: "选择K线周期"
  }
];
```

### 动态追加字段

根据条件动态生成追加字段：

```typescript
const MyApiExplorer = ({ assetSchema }: Props) => {
  const appendFormFields: ApiParam[] = [];
  
  // 只有股票类型才追加这个字段
  if (assetSchema === 'stock') {
    appendFormFields.push({
      name: "include_dividends",
      in: "query",
      required: false,
      type: "boolean",
      default: true,
      title: "Include Dividends"
    });
  }
  
  return (
    <CommonExplorerInterface
      endpointId="ohlc_latest_bars"
      appendFormFields={appendFormFields}
    />
  );
};
```

## 最佳实践

1. **使用 ASSET_META** - 为不同资产类型定义默认配置
2. **删除不常用字段** - 使用 `deleteFormFields` 简化用户界面
3. **提供合理默认值** - 使用 `customDefaultValues` 提供开箱即用的体验
4. **添加帮助信息** - 在 `appendFormFields` 中提供 `tip` 和 `help_url`
5. **遵循 country_symbol 规范** - 确保符号格式为 `country_iso_code:symbol`

## 故障排除

### 问题: API Base URL 始终是 default

**原因**: `country_symbol` 格式不正确或未包含冒号

**解决方案**: 确保 `country_symbol` 格式为 `country_iso_code:symbol`，例如 `"us:spy"` 而不是 `"spy"`

### 问题: 追加的字段不显示

**原因**: `appendFormFields` 可能有类型错误

**解决方案**: 检查 `ApiParam` 接口的所有必填字段是否都已提供

### 问题: 删除字段不生效

**原因**: 字段名拼写错误

**解决方案**: 使用准确的字段名，可以从 `api_endpoints.ts` 中复制

## 总结

`CommonExplorerInterface` 让添加新的 API Explorer 变得非常简单：

```typescript
// 最简单的用法
<CommonExplorerInterface endpointId="your_endpoint_id" />

// 常见用法
<CommonExplorerInterface
  endpointId="your_endpoint_id"
  deleteFormFields={["field1", "field2"]}
  customDefaultValues={{ param: "value" }}
/>

// 高级用法
<CommonExplorerInterface
  endpointId="your_endpoint_id"
  appendFormFields={[...]}
  deleteFormFields={[...]}
  customDefaultValues={{...}}
/>
```

通过这三个简单的配置参数，你可以快速为任何 API 端点创建一个功能完整的交互式界面！

