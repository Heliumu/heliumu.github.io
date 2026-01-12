import React from 'react';
import { API_CATEGORIES } from './apiExplorers/apiConfig';
import { useTranslation } from './LanguageContext';

const DatasetMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const { t, withLangPrefix } = useTranslation();

  if (!isOpen) return null;

  // 选择要显示的主要分类（排除 quickstart 和 other）
  const mainCategories = API_CATEGORIES.filter(cat =>
    !['quickstart', 'other'].includes(cat.key)
  );

  // 将分类分成 3 列，每列最多 3 个
  const col1 = mainCategories.slice(0, 3);  // Crypto, Forex, Stock
  const col2 = mainCategories.slice(3, 6);  // Future, Option, Economic
  const col3 = mainCategories.slice(6, 8);  // News, Holiday

  const columns = [col1, col2, col3];

  return (
    <div className="absolute top-full left-0 mt-2 w-full sm:w-auto sm:min-w-[750px] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="grid grid-cols-1 sm:grid-cols-3 p-6 gap-8">
        {columns.map((columnCategories, colIndex) => (
          <div key={colIndex} className="space-y-6">
            {columnCategories.map((category) => (
              <div key={category.key} className="space-y-3">
                <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <div className="h-1 w-1 bg-indigo-500 rounded-full"></div>
                  {t(`apiList.categories.${category.translationKey}`)}
                </div>
                <ul className="space-y-1.5 ml-3">
                  {category.apis.map((api) => (
                    <li key={api.key}>
                      <a
                        href={withLangPrefix(`/api_explorer/${api.key}`)}
                        className="text-sm text-slate-500 hover:text-indigo-600 transition-colors block"
                      >
                        {t(`apiList.apis.${api.translationKey}`)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="text-xs text-slate-400">{t('datasetMenu.cantFind')}</span>
        <a
          href={withLangPrefix('/api_explorer/quickstart')}
          className="text-xs font-bold text-indigo-600 hover:underline"
        >
          {t('datasetMenu.viewAll')} →
        </a>
      </div>
    </div>
  );
};

export default DatasetMenu;
