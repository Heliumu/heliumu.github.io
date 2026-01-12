import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Economic Calendar Event List Explorer
 * 查询经济日历事件列表
 */
const EconomicCalendarEventListExplorer: React.FC = () => {
  const customDefaultValues = {
    country_iso_code: 'US',
  };

  return (
    <CommonExplorerInterface
      endpointId="economic_calendar_event_list"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default EconomicCalendarEventListExplorer;

