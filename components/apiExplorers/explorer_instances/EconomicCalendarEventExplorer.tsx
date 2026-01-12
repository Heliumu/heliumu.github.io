import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Economic Calendar Event Explorer
 * 查询单个经济日历事件详情
 */
const EconomicCalendarEventExplorer: React.FC = () => {
  const customDefaultValues = {
    event_code: 'INFLATION_CPI_NSA',
  };

  return (
    <CommonExplorerInterface
      endpointId="economic_calendar_event"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default EconomicCalendarEventExplorer;

