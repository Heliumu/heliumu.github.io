import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Economic Calendar Event Codes Explorer
 * 查询经济日历事件代码列表
 */
const EconomicCalendarEventCodesExplorer: React.FC = () => {
  const customDefaultValues = {
    country_iso_code: 'US',
  };

  return (
    <CommonExplorerInterface
      endpointId="economic_calendar_event_codes"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default EconomicCalendarEventCodesExplorer;

