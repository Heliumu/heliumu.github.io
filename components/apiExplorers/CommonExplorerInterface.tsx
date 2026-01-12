import React, { useMemo, useState } from 'react';
import JsonViewer from '../JsonViewer';
import { ApiParam, splicingFullSchemaName, getApiBaseUrl } from '@/types';
import { API_ENDPOINTS } from './api_endpoints';
import { useTranslation } from '../LanguageContext';

interface CommonExplorerProps {
  endpointId: string;
  appendFormFields?: ApiParam[];
  deleteFormFields?: string[];
  customDefaultValues?: Record<string, any>;
}

const CommonExplorerInterface: React.FC<CommonExplorerProps> = ({
  endpointId,
  appendFormFields = [],
  deleteFormFields = [],
  customDefaultValues = {}
}) => {
  const { t, language } = useTranslation();

  // 获取 endpoint 配置
  const endpoint = API_ENDPOINTS[endpointId];
  if (!endpoint) {
    return <div className="p-8 text-red-600">Error: Endpoint "{endpointId}" not found</div>;
  }

  // 合并参数配置：原始参数 - 删除的字段 + 追加的字段
  const mergedParams = useMemo(() => {
    // 先过滤掉要删除的字段
    let params = endpoint.parameters.filter(p => !deleteFormFields.includes(p.name));

    // 追加额外字段（如果已存在则覆盖）
    appendFormFields.forEach(appendParam => {
      const existingIndex = params.findIndex(p => p.name === appendParam.name);
      if (existingIndex >= 0) {
        params[existingIndex] = appendParam;
      } else {
        params.push(appendParam);
      }
    });

    return params;
  }, [endpoint.parameters, appendFormFields, deleteFormFields]);

  // 初始化表单值（不从 localStorage 读取，避免 hydration 错误）
  const initFormValues = () => {
    const values: Record<string, any> = {};

    mergedParams.forEach(param => {
      if (customDefaultValues[param.name] !== undefined) {
        values[param.name] = customDefaultValues[param.name];
      } else if (param.default !== undefined) {
        values[param.name] = param.default;
      } else if (param.type === 'boolean') {
        values[param.name] = false;
      } else if (param.type === 'integer') {
        values[param.name] = 0;
      } else if (param.type === 'enum' && param.options && param.options.length > 0) {
        // enum 类型：如果没有默认值，使用第一个选项
        values[param.name] = param.options[0];
      } else {
        values[param.name] = '';
      }
    });
    return values;
  };

  const [formValues, setFormValues] = useState<Record<string, any>>(initFormValues());
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [openHelp, setOpenHelp] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // 在客户端挂载后从 localStorage 读取 secret_key
  React.useEffect(() => {
    setIsMounted(true);
    try {
      const cachedSecretKey = localStorage.getItem('api_secret_key');
      if (cachedSecretKey && !formValues['secret_key']) {
        setFormValues(prev => ({
          ...prev,
          secret_key: cachedSecretKey
        }));
      }
    } catch (e) {
      // localStorage 不可用，忽略
    }
  }, []); // 只在挂载时运行一次

  // 更新表单值
  const updateValue = (name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    // 清除该字段的验证错误
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // 验证表单
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    mergedParams.forEach(param => {
      if (param.required) {
        const value = formValues[param.name];
        if (value === undefined || value === null || value === '') {
          errors[param.name] = t('explorer.validation.required');
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // 格式化日期时间为 ISO 8601 格式（带时区）
  const formatDateTimeWithTimezone = (dateTimeLocal: string): string => {
    if (!dateTimeLocal) return '';

    // datetime-local 格式: "2024-01-01T12:00"
    // 创建本地时间的 Date 对象
    const date = new Date(dateTimeLocal);

    // 转换为 ISO 8601 格式，保留本地时区偏移
    // 例如: "2024-01-01T12:00:00+08:00" 或 "2024-01-01T12:00:00Z"
    return date.toISOString();
  };

  // 构建完整 URL
  const constructedUrl = useMemo(() => {
    // 获取 asset_schema 和 country_symbol 来确定 base URL
    const assetSchema = formValues['asset_schema'] || '';
    const countrySymbol = formValues['country_symbol'] || '';

    let baseUrl = getApiBaseUrl('default');
    if (assetSchema && countrySymbol) {
      try {
        const fullSchemaName = splicingFullSchemaName(assetSchema, countrySymbol);
        baseUrl = getApiBaseUrl(fullSchemaName);
      } catch (e) {
        // 如果出错，使用默认 URL
      }
    }

    // 替换路径参数
    let path = endpoint.path;
    const queryParams: string[] = [];

    mergedParams.forEach(param => {
      const value = formValues[param.name];
      if (param.in === 'path') {
        path = path.replace(`{${param.name}}`, encodeURIComponent(value || ''));
      } else if (param.in === 'query' && value !== undefined && value !== '') {
        queryParams.push(`${param.name}=${encodeURIComponent(value)}`);
      }
    });

    const fullUrl = `${baseUrl}${path}`;
    return queryParams.length > 0 ? `${fullUrl}?${queryParams.join('&')}` : fullUrl;
  }, [endpoint.path, mergedParams, formValues]);

  // 发送真实的 API 请求
  const handleRunRequest = async () => {
    // 验证表单
    if (!validateForm()) {
      // 滚动到第一个错误字段
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const element = document.querySelector(`[name="${firstErrorField}"]`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    setData(null);

    // 缓存 secret_key 到 localStorage
    try {
      const secretKey = formValues['secret_key'];
      if (secretKey && secretKey !== 'input-your-secret-key-here') {
        localStorage.setItem('api_secret_key', secretKey);
      }
    } catch (e) {
      // localStorage 可能不可用，忽略错误
    }

    try {
      const response = await fetch(constructedUrl, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const contentType = response.headers.get('content-type');
      let responseData;

      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType && contentType.includes('text/csv')) {
        responseData = await response.text();
      } else {
        responseData = await response.text();
      }

      setData({
        status: response.ok ? 'success' : 'error',
        statusCode: response.status,
        statusText: response.statusText,
        data: responseData
      });
    } catch (error: any) {
      setData({
        status: 'error',
        error: error.message || 'Network error',
        message: 'Failed to fetch data. Please check your network connection and API key.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(constructedUrl);
    alert('URL Copied!');
  };

  const handleCopyResponse = () => {
    if (!data) {
      alert('No response to copy');
      return;
    }
    const content = typeof data.data === 'string' ? data.data : JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(content);
    alert('Response copied to clipboard');
  };

  const toggleHelp = (name: string) => {
    setOpenHelp(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // 渲染单个表单字段
  const renderField = (param: ApiParam) => {
    const value = formValues[param.name];
    const label = param.title || param.name;
    const hasError = validationErrors[param.name];

    return (
      <div key={param.name} className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          {label} {param.required && <span className="text-red-500">*</span>}
        </label>

        {param.type === 'enum' && param.options ? (
          <select
            name={param.name}
            value={value}
            onChange={e => updateValue(param.name, e.target.value)}
            className={`w-full bg-white border ${hasError ? 'border-red-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-sm`}
          >
            {param.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : param.type === 'boolean' ? (
          <div className="flex items-center gap-3">
            <input
              name={param.name}
              type="checkbox"
              checked={!!value}
              onChange={() => updateValue(param.name, !value)}
            />
            <span className="text-xs text-slate-500">{param.tip || label}</span>
          </div>
        ) : param.type === 'integer' || param.type === 'number' ? (
          <input
            name={param.name}
            type="number"
            value={value}
            onChange={e => updateValue(param.name, Number(e.target.value))}
            className={`w-full bg-white border ${hasError ? 'border-red-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-sm`}
          />
        ) : param.type === 'date-time' ? (
          <div className="space-y-2">
            <input
              name={param.name}
              type="datetime-local"
              value={value}
              onChange={e => updateValue(param.name, e.target.value)}
              className={`w-full bg-white border ${hasError ? 'border-red-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-sm`}
            />
            {value && (
              <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                <div className="font-semibold mb-1">将被转换为带时区的格式：</div>
                <div className="font-mono text-indigo-600">
                  {formatDateTimeWithTimezone(value)}
                </div>
                <div className="mt-1 text-[10px]">
                  时区: {Intl.DateTimeFormat().resolvedOptions().timeZone} (本地时区)
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              name={param.name}
              type="text"
              value={value}
              onChange={e => updateValue(param.name, e.target.value)}
              className={`flex-1 bg-white border ${hasError ? 'border-red-500' : 'border-slate-200'} rounded-lg px-3 py-2 text-sm`}
              placeholder={param.tip || ''}
            />
            {param.tip || param.help_url ? (
              <button
                type="button"
                onClick={() => toggleHelp(param.name)}
                className="px-3 py-2 bg-slate-100 rounded hover:bg-slate-200"
              >
                ?
              </button>
            ) : null}
          </div>
        )}

        {hasError && (
          <div className="text-xs text-red-500 mt-1">
            {validationErrors[param.name]}
          </div>
        )}

        {openHelp[param.name] && (param.tip || param.help_url) && (
          <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
            {param.tip}
            {param.help_url && (
              <div className="mt-1">
                <a
                  className="text-indigo-600 underline"
                  href={param.help_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  查看文档
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{t(`explorer.titles.${endpointId}`)}</h2>
          <p className="text-sm text-slate-500">
            {endpoint.method} {endpoint.path}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="space-y-4">
              {mergedParams.map(param => renderField(param))}

              <button
                onClick={handleRunRequest}
                disabled={isLoading}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {isLoading ? t('apiExplorer.loading') : t('apiExplorer.runRequest')}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold uppercase text-slate-400">Endpoint</div>
              <button
                onClick={handleCopyUrl}
                className="text-[10px] font-bold text-indigo-600 hover:underline"
              >
                Copy URL
              </button>
            </div>

            <div className="p-4 bg-slate-900 text-indigo-200 rounded-lg font-mono text-sm overflow-auto break-all">
              {endpoint.method} {constructedUrl}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold uppercase text-slate-400">Response</div>
                <button
                  onClick={handleCopyResponse}
                  className="text-[10px] font-bold text-indigo-600 hover:underline"
                  disabled={!data}
                >
                  Copy Response
                </button>
              </div>

              {isLoading ? (
                <div className="p-6 bg-slate-50 rounded-lg">{t('apiExplorer.loading')}</div>
              ) : (
                <JsonViewer data={data} isLoading={isLoading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonExplorerInterface;

