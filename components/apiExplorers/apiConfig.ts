// 共享的 API 数据配置
// 用于 ApiList 和 DatasetMenu

export type ApiCategory = {
  key: string;
  translationKey: string;
  apis: Array<{
    key: string;
    translationKey: string;
  }>;
};

export const API_CATEGORIES: ApiCategory[] = [
  {
    key: 'quickstart',
    translationKey: 'quickstart',
    apis: [
      { key: 'quickstart', translationKey: 'quickstart' }
    ]
  },
  {
    key: 'crypto',
    translationKey: 'crypto',
    apis: [
      { key: 'ohlc_latest_bars__crypto', translationKey: 'ohlc_latest_bars' },
      { key: 'ohlc_history_bars__crypto', translationKey: 'ohlc_history_bars' },
      { key: 'asset_reference__crypto', translationKey: 'asset_reference' }
    ]
  },
  {
    key: 'forex',
    translationKey: 'forex',
    apis: [
      { key: 'ohlc_latest_bars__forex', translationKey: 'ohlc_latest_bars' },
      { key: 'ohlc_history_bars__forex', translationKey: 'ohlc_history_bars' },
      { key: 'asset_reference__forex', translationKey: 'asset_reference' }
    ]
  },
  {
    key: 'stock',
    translationKey: 'stock',
    apis: [
      { key: 'ohlc_latest_bars__stock', translationKey: 'ohlc_latest_bars' },
      { key: 'ohlc_history_bars__stock', translationKey: 'ohlc_history_bars' },
      { key: 'asset_reference__stock', translationKey: 'asset_reference' },
      { key: 'stock_corporate_action_list', translationKey: 'stock_corporate_action_list' }
    ]
  },
  {
    key: 'future',
    translationKey: 'future',
    apis: [
      { key: 'ohlc_latest_bars__future', translationKey: 'ohlc_latest_bars' },
      { key: 'ohlc_history_bars__future', translationKey: 'ohlc_history_bars' },
      { key: 'asset_reference__future', translationKey: 'asset_reference' },
      { key: 'futures_continuous_real_contracts', translationKey: 'futures_continuous_real_contracts' },
      { key: 'futures_active_rank_real_symbol', translationKey: 'futures_active_rank_real_symbol' },
      { key: 'futures_tradable_symbols', translationKey: 'futures_tradable_symbols' }
    ]
  },
  {
    key: 'option',
    translationKey: 'option',
    apis: [
      { key: 'ohlc_latest_bars__option', translationKey: 'ohlc_latest_bars' },
      { key: 'ohlc_history_bars__option', translationKey: 'ohlc_history_bars' },
      { key: 'asset_reference__option', translationKey: 'asset_reference' },
      { key: 'search_options', translationKey: 'search_options' },
      { key: 'options_expiration_date_list', translationKey: 'options_expiration_date_list' }
    ]
  },
  {
    key: 'economic_calendar',
    translationKey: 'economic_calendar',
    apis: [
      { key: 'economic_calendar_event_list', translationKey: 'event_list' },
      { key: 'economic_calendar_latest_event_list', translationKey: 'latest_event_list' },
      { key: 'economic_calendar_event', translationKey: 'event' },
      { key: 'economic_calendar_event_codes', translationKey: 'event_codes' }
    ]
  },
  {
    key: 'news',
    translationKey: 'news',
    apis: [
      { key: 'news_list', translationKey: 'news_list' },
      { key: 'news_latest', translationKey: 'latest_news' }
    ]
  },
  {
    key: 'holiday',
    translationKey: 'holiday',
    apis: [
      { key: 'holiday_list', translationKey: 'holiday_list' },
      { key: 'holiday_codes', translationKey: 'holiday_codes' }
    ]
  },
  {
    key: 'other',
    translationKey: 'other',
    apis: [
      { key: 'address_info', translationKey: 'address_info' }
    ]
  }
];

// 用于 DatasetMenu 的分组结构
export const getDatasetMenuGroups = () => {
  return [
    {
      title: 'Market Data',
      titleKey: 'datasetMenu.marketData',
      categories: [
        {
          key: 'crypto',
          labelKey: 'apiList.categories.crypto',
          items: ['crypto', 'forex', 'stock', 'future', 'option']
        }
      ]
    },
    {
      title: 'Insights',
      titleKey: 'datasetMenu.insights',
      categories: [
        {
          key: 'economic',
          labelKey: 'apiList.categories.economic_calendar',
          items: ['economic_calendar', 'news', 'holiday']
        }
      ]
    }
  ];
};

