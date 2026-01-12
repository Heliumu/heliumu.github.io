import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * News List Explorer
 * 查询新闻列表
 */
const NewsListExplorer: React.FC = () => {
  const customDefaultValues = {
    full_symbol: 'stock:us:aapl',
  };

  return (
    <CommonExplorerInterface
      endpointId="news_list"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default NewsListExplorer;

