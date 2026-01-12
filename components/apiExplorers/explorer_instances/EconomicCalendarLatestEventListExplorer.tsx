import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Economic Calendar Latest Event List Explorer
 * 查询最新经济日历事件列表
 */
const EconomicCalendarLatestEventListExplorer: React.FC = () => {
  const customDefaultValues = {
    country_iso_code: 'US',
  };

  return (
    <CommonExplorerInterface
      endpointId="economic_calendar_latest_event_list"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default EconomicCalendarLatestEventListExplorer;

