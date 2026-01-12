import { DatasetGroup, ApiEndpoint } from './types';
import { ENV_CONFIG,getPricingUrl } from './lib/env-config';
export const NAV_ITEMS = [
  { label: 'Home', href: '/', key: 'nav.home', external: false },
  { label: 'Dataset', href: '#dataset', isDropdown: true, key: 'nav.dataset', external: false },
  //{ label: 'Pricing', href: getPricingUrl(), key: 'nav.pricing', external: true },
  { label: 'Docs', href: ENV_CONFIG.DOCS_URL, key: 'nav.docs', external: true },
    { label: 'API Docs', href: ENV_CONFIG.DOCS_URL+'/en/docs/api/', key: 'nav.api_docs', external: true },
    { label: 'WS push Docs', href: ENV_CONFIG.DOCS_URL+'/en/docs/api/websockets/websocket_testing_guide/', key: 'nav.ws_push_docs', external: true },
    { label: 'Finance MCP', href: ENV_CONFIG.DOCS_URL+'/en/docs/finance-trading-ai-agents-mcp/', key: 'nav.mcp_docs', external: true },
    { label: 'TradingAgents', href: 'https://github.com/aitrados/langchain-trading-agents', key: 'nav.agents_docs', external: true },

  { label: 'Github', href: 'https://github.com/aitrados', key: 'nav.github', external: true },
];





export const TICKER_DATA = [
  { symbol: 'SPY', price: '502.23', change: '+1.2%', up: true },
  { symbol: 'AAPL', price: '189.43', change: '-0.45%', up: false },
  { symbol: 'NVDA', price: '726.13', change: '+3.4%', up: true },
  { symbol: 'TSLA', price: '193.57', change: '+0.12%', up: true },
  { symbol: 'BTC/USD', price: '52,143', change: '-1.23%', up: false },
  { symbol: 'ETH/USD', price: '2,812', change: '+2.1%', up: true },
];

export const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'ohlc_latest',
    summary: 'Ohlc Latest Bars',
    path: '/api/v2/{asset_schema}/bars/{country_symbol}/{interval}/latest',
    method: 'GET',
    parameters: [
      { name: 'asset_schema', in: 'path', required: true, type: 'enum', options: ['crypto', 'forex', 'stock', 'future', 'option'] },
      { name: 'country_symbol', in: 'path', required: true, type: 'string', default: 'us:spy', tip: 'Full instrument symbol, e.g. us:spy or crypto:btc' },
      { name: 'interval', in: 'path', required: true, type: 'enum', options: ['MON', 'WEEK', 'DAY', '240M', '120M', '60M', '30M', '15M', '10M', '5M', '3M', '1M'], default: 'DAY' },
      { name: 'secret_key', in: 'query', required: true, type: 'string', default: 'your-secret-key-here', tip: 'Your API secret key. Register at aitrados.com', help_url: 'https://www.aitrados.com/docs/auth' },
      { name: 'adjusted', in: 'query', required: false, type: 'boolean', default: true, tip: 'Whether to return adjusted prices (true/false)' },
      { name: 'sort', in: 'query', required: false, type: 'enum', options: ['asc', 'desc'], default: 'asc' },
      { name: 'limit', in: 'query', required: false, type: 'integer', default: 150 },
      { name: 'format', in: 'query', required: false, type: 'enum', options: ['json', 'csv'], default: 'json' },
      { name: 'is_eth', in: 'query', required: false, type: 'boolean', default: false, tip: 'If true, interpret amount fields as ETH denominated' },
    ]
  },
  {
    id: 'ohlc_history',
    summary: 'Ohlc History Bars',
    path: '/api/v2/{asset_schema}/bars/{country_symbol}/{interval}/from/{from_date}/to/{to_date}',
    method: 'GET',
    parameters: [
      { name: 'asset_schema', in: 'path', required: true, type: 'enum', options: ['crypto', 'forex', 'stock', 'future', 'option'] },
      { name: 'country_symbol', in: 'path', required: true, type: 'string', default: 'us:aapl' },
      { name: 'interval', in: 'path', required: true, type: 'enum', options: ['MON', 'WEEK', 'DAY', '60M'], default: 'DAY' },
      { name: 'from_date', in: 'path', required: true, type: 'date-time', default: '2024-01-01T00:00:00Z' },
      { name: 'to_date', in: 'path', required: true, type: 'date-time', default: '2024-12-31T23:59:59Z' },
      { name: 'secret_key', in: 'query', required: true, type: 'string', default: 'your-secret-key-here' },
      { name: 'limit', in: 'query', required: false, type: 'integer', default: 150 },
      { name: 'format', in: 'query', required: false, type: 'enum', options: ['json', 'csv'], default: 'json' },
    ]
  },
  {
    id: 'asset_ref',
    summary: 'Asset Reference',
    path: '/api/v2/{asset_schema}/reference/{country_symbol}',
    method: 'GET',
    parameters: [
      { name: 'asset_schema', in: 'path', required: true, type: 'enum', options: ['crypto', 'forex', 'stock', 'future', 'option'] },
      { name: 'country_symbol', in: 'path', required: true, type: 'string', default: 'us:tsla' },
      { name: 'secret_key', in: 'query', required: true, type: 'string' },
    ]
  },
  {
    id: 'news_latest',
    summary: 'News Latest',
    path: '/api/v2/news/latest',
    method: 'GET',
    parameters: [
      { name: 'secret_key', in: 'query', required: true, type: 'string' },
      { name: 'full_symbol', in: 'query', required: false, type: 'string' },
      { name: 'sort', in: 'query', required: false, type: 'enum', options: ['asc', 'desc'], default: 'desc' },
      { name: 'limit', in: 'query', required: false, type: 'integer', default: 5 },
    ]
  },
  {
    id: 'economic_calendar',
    summary: 'Economic Calendar',
    path: '/api/v2/economic_calendar/event_list',
    method: 'GET',
    parameters: [
      { name: 'secret_key', in: 'query', required: true, type: 'string' },
      { name: 'country_iso_code', in: 'query', required: false, type: 'string', default: 'US' },
      { name: 'impact', in: 'query', required: false, type: 'enum', options: ['low', 'medium', 'high', 'all'], default: 'all' },
      { name: 'limit', in: 'query', required: false, type: 'integer', default: 20 },
    ]
  }
];
