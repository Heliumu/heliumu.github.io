import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Holiday List Explorer
 * 查询假期列表
 */
const HolidayListExplorer: React.FC = () => {
  const customDefaultValues = {
    full_symbol: 'STOCK:US:TSLA',
  };

  return (
    <CommonExplorerInterface
      endpointId="holiday_list"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default HolidayListExplorer;

