import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Futures Tradable Symbols Explorer
 * 查询期货可交易代码列表
 */
const FuturesTradableSymbolsExplorer: React.FC = () => {
  const customDefaultValues = {
    country_iso_code: 'cn',
  };

  return (
    <CommonExplorerInterface
      endpointId="futures_tradable_symbols"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default FuturesTradableSymbolsExplorer;

