import React from 'react';
import { SitesToolsProps } from './types';
import LongInputGrid from './LongInputGrid';
import FilterSearch from './FilterSearch';
import AddSites from './AddSites';

const SitesTools: React.FunctionComponent<SitesToolsProps> = ({
  setText,
  addSite,
  enterPressed,
}) => {
  return (
    <LongInputGrid
      inputs={[
        <FilterSearch setText={setText} enterPressed={enterPressed} />,
        <AddSites addSite={addSite} />,
      ]}
    />
  );
};

export default SitesTools;
