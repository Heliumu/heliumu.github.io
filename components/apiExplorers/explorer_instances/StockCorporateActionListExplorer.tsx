import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface.tsx';

/**
 * Stock Corporate Action List Explorer
 * 查询股票公司行动列表（分红、拆股、合股等）
 */
const StockCorporateActionListExplorer: React.FC = () => {
  const customDefaultValues = {
    country_symbol: 'us:aapl',

  };

  return (
    <CommonExplorerInterface
      endpointId="stock_corporate_action_list"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default StockCorporateActionListExplorer;

