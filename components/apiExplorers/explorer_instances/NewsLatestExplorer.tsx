import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * News Latest Explorer
 * 查询最新新闻
 */
const NewsLatestExplorer: React.FC = () => {
  const customDefaultValues = {
    full_symbol: 'stock:us:aapl',
  };

  return (
    <CommonExplorerInterface
      endpointId="news_latest"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default NewsLatestExplorer;

