import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Options Expiration Date List Explorer
 * 查询期权到期日列表
 */
const OptionsExpirationDateListExplorer: React.FC = () => {
  const customDefaultValues = {
    parent_full_symbol: 'stock:us:aapl',
  };

  return (
    <CommonExplorerInterface
      endpointId="options_expiration_date_list"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default OptionsExpirationDateListExplorer;

