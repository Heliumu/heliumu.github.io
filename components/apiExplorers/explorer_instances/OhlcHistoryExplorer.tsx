import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface.tsx';

type AssetSchema = 'crypto' | 'forex' | 'stock' | 'future' | 'option';

interface Props {
  assetSchema?: AssetSchema;
}

const DEF_COUNTRY_SYMBOL: Record<AssetSchema, { country_symbol: string }> = {
  crypto: { country_symbol: 'global:btcusd' },
  forex: { country_symbol: 'global:eurusd'},
  stock: { country_symbol: 'us:spy' },
  future: { country_symbol: 'cn:rb2610' },
  option: { country_symbol: 'us:FIG260102C00022000' },
};

/**
 * Ohlc Latest Bars Explorer
 * 使用 CommonExplorerInterface 实现的通用 API Explorer
 */
const OhlcHistoryExplorer: React.FC<Props> = ({ assetSchema = 'stock' }) => {
  const meta = DEF_COUNTRY_SYMBOL[assetSchema];
  //console.log('🔍 OhlcLatestExplorer 接收到的 assetSchema:', assetSchema);
  // 删除不常用的字段（根据资产类型）
  var deleteFormFields=[]
  if (assetSchema !=='stock'){
    deleteFormFields.push('adjusted')
    deleteFormFields.push('is_eth')
  }
  // 自定义默认值
  const customDefaultValues = {
    asset_schema: assetSchema,
    country_symbol: meta.country_symbol,
    interval: "DAY"
  };

  return (
    <CommonExplorerInterface
      endpointId="ohlc_history_bars"
      deleteFormFields={deleteFormFields}
      customDefaultValues={customDefaultValues}
    />
  );
};

export default OhlcHistoryExplorer;

