import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Futures Active Rank Real Symbol Explorer
 * 查询期货活跃排名真实代码
 */
const FuturesActiveRankRealSymbolExplorer: React.FC = () => {
  const customDefaultValues = {
    country_symbol: 'cn:sc!a1',
  };

  return (
    <CommonExplorerInterface
      endpointId="futures_active_rank_real_symbol"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default FuturesActiveRankRealSymbolExplorer;

