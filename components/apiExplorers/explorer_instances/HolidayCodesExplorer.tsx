import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Holiday Codes Explorer
 * 查询假期代码列表
 */
const HolidayCodesExplorer: React.FC = () => {
  const customDefaultValues = {
    country_iso_code: 'US',
  };

  return (
    <CommonExplorerInterface
      endpointId="holiday_codes"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default HolidayCodesExplorer;

