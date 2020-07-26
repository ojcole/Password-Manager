import React from 'react';
import { SitesToolsProps } from './types';
import LongInputGrid from './LongInputGrid';
import FilterSearch from './FilterSearch';
import AddSites from './AddSites';

const SitesTools: React.FunctionComponent<SitesToolsProps> = ({
  setText,
  addSite,
}) => {
  return (
    <LongInputGrid
      inputs={[
        <FilterSearch setText={setText} />,
        <AddSites addSite={addSite} />,
      ]}
    />
  );
};

export default SitesTools;
