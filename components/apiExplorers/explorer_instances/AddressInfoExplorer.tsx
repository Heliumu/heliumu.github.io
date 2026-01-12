import React from 'react';
import CommonExplorerInterface from '../CommonExplorerInterface';

/**
 * Address Info Explorer
 * 查询地址信息
 */
const AddressInfoExplorer: React.FC = () => {
  const customDefaultValues = {};

  return (
    <CommonExplorerInterface
      endpointId="address_info"
      customDefaultValues={customDefaultValues}
    />
  );
};

export default AddressInfoExplorer;

