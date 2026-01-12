import React, { useState } from 'react';
import { useTranslation } from '../LanguageContext';
import { API_CATEGORIES } from './apiConfig';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
  NewspaperIcon,
  CalendarIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';

interface Item {
  key: string;
  label: string;
  children?: Item[];
}

interface Props {
  selected: string;
  onSelect: (key: string) => void;
}

const ApiList: React.FC<Props> = ({ selected, onSelect }) => {
  const { withLangPrefix, t } = useTranslation();

  // 折叠状态管理 - 默认全部展开
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  // 分类图标映射
  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    quickstart: RocketLaunchIcon,
    crypto: CurrencyDollarIcon,
    forex: BanknotesIcon,
    stock: ChartBarIcon,
    future: ArrowTrendingUpIcon,
    option: DocumentChartBarIcon,
    economic_calendar: CalendarDaysIcon,
    news: NewspaperIcon,
    holiday: CalendarIcon,
    other: EllipsisHorizontalIcon,
  };

  // 从共享配置生成 items
  const items: Item[] = API_CATEGORIES.map(category => {
    const categoryLabel = t(`apiList.categories.${category.translationKey}`);

    // 如果只有一个 API 且 key 与 category 相同(如 quickstart),不创建子项
    if (category.apis.length === 1 && category.apis[0].key === category.key) {
      return {
        key: category.key,
        label: categoryLabel
      };
    }

    // 否则创建带子项的分类
    return {
      key: category.key,
      label: categoryLabel,
      children: category.apis.map(api => ({
        key: api.key,
        label: t(`apiList.apis.${api.translationKey}`)
      }))
    };
  });

  const toggleCollapse = (key: string) => {
    setCollapsed(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const renderItem = (item: Item, categoryKey: string) => {
    const Icon = categoryIcons[categoryKey] || EllipsisHorizontalIcon;
    const isCollapsed = collapsed[item.key];
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.key} className="">
        <div className="flex items-center">
          <button
            onClick={() => {
              if (hasChildren) {
                toggleCollapse(item.key);
              } else {
                onSelect(item.key);
                const href = withLangPrefix(`/api_explorer/${item.key}`);
                try { history.pushState({}, '', href); } catch (e) { /* ignore */ }
              }
            }}
            className={`flex-1 flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
              selected === item.key && !hasChildren
                ? 'bg-indigo-50 text-indigo-600 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {hasChildren && (
              isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4 flex-shrink-0 text-slate-400 transition-transform" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 flex-shrink-0 text-slate-400 transition-transform" />
              )
            )}
          </button>
        </div>

        {hasChildren && !isCollapsed && (
          <ul className="mt-1 space-y-1">
            {item.children!.map(c => (
              <li key={c.key}>
                <button
                  onClick={() => {
                    onSelect(c.key);
                    const href = withLangPrefix(`/api_explorer/${c.key}`);
                    try { history.pushState({}, '', href); } catch (e) { /* ignore */ }
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md block text-sm transition-colors ${
                    selected === c.key
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  style={{ paddingLeft: 44 }}
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="bg-white rounded-xl border p-4 sticky top-24">
      <h3 className="text-sm font-bold mb-3 text-slate-800">API Explorers</h3>
      <ul className="space-y-1">
        {items.map((item) => renderItem(item, item.key))}
      </ul>
    </div>
  );
};

export default ApiList;