import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PageHead } from '../PageHead';
import OhlcLatestExplorer from './explorer_instances/OhlcLatestExplorer.tsx';
import OhlcHistoryExplorer from './explorer_instances/OhlcHistoryExplorer.tsx';
import AssetReferenceExplorer from './explorer_instances/AssetReferenceExplorer.tsx';
import StockCorporateActionListExplorer from './explorer_instances/StockCorporateActionListExplorer.tsx';
import FuturesContinuousRealContractsExplorer from './explorer_instances/FuturesContinuousRealContractsExplorer.tsx';
import FuturesActiveRankRealSymbolExplorer from './explorer_instances/FuturesActiveRankRealSymbolExplorer.tsx';
import FuturesTradableSymbolsExplorer from './explorer_instances/FuturesTradableSymbolsExplorer.tsx';
import SearchOptionsExplorer from './explorer_instances/SearchOptionsExplorer.tsx';
import OptionsExpirationDateListExplorer from './explorer_instances/OptionsExpirationDateListExplorer.tsx';
import EconomicCalendarEventListExplorer from './explorer_instances/EconomicCalendarEventListExplorer.tsx';
import EconomicCalendarLatestEventListExplorer from './explorer_instances/EconomicCalendarLatestEventListExplorer.tsx';
import EconomicCalendarEventExplorer from './explorer_instances/EconomicCalendarEventExplorer.tsx';
import EconomicCalendarEventCodesExplorer from './explorer_instances/EconomicCalendarEventCodesExplorer.tsx';
import NewsListExplorer from './explorer_instances/NewsListExplorer.tsx';
import NewsLatestExplorer from './explorer_instances/NewsLatestExplorer.tsx';
import HolidayListExplorer from './explorer_instances/HolidayListExplorer.tsx';
import HolidayCodesExplorer from './explorer_instances/HolidayCodesExplorer.tsx';
import AddressInfoExplorer from './explorer_instances/AddressInfoExplorer.tsx';

import ApiList from './ApiList.tsx';
import Quickstart from './Quickstart.tsx';

// API 类型配置
const API_TYPES = [
  "ohlc_latest_bars",
  "ohlc_history_bars",
  "asset_reference"
];

const ASSETS = ['crypto', 'forex', 'stock', 'future', 'option'];

// 独立的 API（不需要 assetSchema 参数）
const STANDALONE_APIS = [
  'stock_corporate_action_list',
  'futures_continuous_real_contracts',
  'futures_active_rank_real_symbol',
  'futures_tradable_symbols',
  'search_options',
  'options_expiration_date_list',
  'economic_calendar_event_list',
  'economic_calendar_latest_event_list',
  'economic_calendar_event',
  'economic_calendar_event_codes',
  'news_list',
  'news_latest',
  'holiday_list',
  'holiday_codes',
  'address_info'
];

const ExplorerShell: React.FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>('quickstart');

  useEffect(() => {
    const syncFromUrl = () => {
      try {
        const parts = window.location.pathname.split('/').filter(Boolean);
        console.log('🔍 ExplorerShell URL parts:', parts);
        // parts: [lang, 'api_explorer', apiKey]
        if (parts[1] === 'api_explorer') {
          if (parts[2]) {
            console.log('🔍 Setting selected to:', parts[2]);
            setSelected(parts[2]);
          } else {
            console.log('🔍 Setting selected to default: quickstart');
            setSelected('quickstart');
          }
        }
      } catch (e) {
        // ignore
      }
    };

    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [router.asPath]);

  const renderRight = () => {
    console.log('🔍 ExplorerShell renderRight - selected:', selected);

    // Quickstart
    if (selected === 'quickstart') {
      return <Quickstart />;
    }

    // 处理独立的 API（不需要 assetSchema 参数）
    if (STANDALONE_APIS.includes(selected)) {
      switch (selected) {
        case 'stock_corporate_action_list':
          return <StockCorporateActionListExplorer />;
        case 'futures_continuous_real_contracts':
          return <FuturesContinuousRealContractsExplorer />;
        case 'futures_active_rank_real_symbol':
          return <FuturesActiveRankRealSymbolExplorer />;
        case 'futures_tradable_symbols':
          return <FuturesTradableSymbolsExplorer />;
        case 'search_options':
          return <SearchOptionsExplorer />;
        case 'options_expiration_date_list':
          return <OptionsExpirationDateListExplorer />;
        case 'economic_calendar_event_list':
          return <EconomicCalendarEventListExplorer />;
        case 'economic_calendar_latest_event_list':
          return <EconomicCalendarLatestEventListExplorer />;
        case 'economic_calendar_event':
          return <EconomicCalendarEventExplorer />;
        case 'economic_calendar_event_codes':
          return <EconomicCalendarEventCodesExplorer />;
        case 'news_list':
          return <NewsListExplorer />;
        case 'news_latest':
          return <NewsLatestExplorer />;
        case 'holiday_list':
          return <HolidayListExplorer />;
        case 'holiday_codes':
          return <HolidayCodesExplorer />;
        case 'address_info':
          return <AddressInfoExplorer />;
        default:
          return (
            <div className="p-8 bg-white rounded-xl border">
              <h2 className="text-xl font-bold mb-4">{selected}</h2>
              <p className="text-slate-600">此 API 的 Explorer 还在开发中...</p>
            </div>
          );
      }
    }

    // 动态匹配: {apiType}__{asset}
    const apiTypesPattern = API_TYPES.join('|');
    const assetsPattern = ASSETS.join('|');
    const apiMatch = selected.match(new RegExp(`^(${apiTypesPattern})__(${assetsPattern})$`));

    if (apiMatch) {
      const apiType = apiMatch[1];
      const asset = apiMatch[2] as any;
      console.log('🔍 ExplorerShell apiType:', apiType, 'asset:', asset);

      // 根据 API 类型返回对应的 Explorer 组件
      switch (apiType) {
        case 'ohlc_latest_bars':
          return <OhlcLatestExplorer key={asset} assetSchema={asset} />;
        case 'ohlc_history_bars':
          return <OhlcHistoryExplorer key={asset} assetSchema={asset} />;
        case 'asset_reference':
          return <AssetReferenceExplorer key={asset} assetSchema={asset} />;
        default:
          return <div className="p-8">Unknown API type: {apiType}</div>;
      }
    }

    // Fallback: 如果没有匹配到任何模式，显示占位符
    return (
      <div className="p-8 bg-white rounded-xl border">
        <h2 className="text-xl font-bold mb-4">Select an API</h2>
        <p className="text-slate-600">Please select an API from the list on the left to begin exploring.</p>
      </div>
    );
  };

  // 从 selected 中提取 API key 用于设置页面标题
  // 例如: "ohlc_latest_bars__stock" -> "ohlc_latest_bars"
  // 或: "quickstart" -> "quickstart"
  const pageKey = selected.split('__')[0];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <PageHead pageKey={pageKey} />
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <ApiList selected={selected} onSelect={(k) => {
              setSelected(k);
            }} />
          </div>
          <div className="col-span-3">
            {renderRight()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerShell;