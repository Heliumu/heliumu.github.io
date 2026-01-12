import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Search Options Explorer
 * 搜索期权合约
 */
const SearchOptionsExplorer: React.FC = () => {
  const customDefaultValues = {
    parent_full_symbol: 'stock:us:spy',
  };

  return (
    <CommonExplorerInterface
      endpointId="search_options"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default SearchOptionsExplorer;

