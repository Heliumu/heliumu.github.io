import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Futures Continuous Real Contracts Explorer
 * 查询期货连续真实合约
 */
const FuturesContinuousRealContractsExplorer: React.FC = () => {
  const customDefaultValues = {
    country_symbol: 'cn:sc!m1',
  };

  return (
    <CommonExplorerInterface
      endpointId="futures_continuous_real_contracts"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default FuturesContinuousRealContractsExplorer;

