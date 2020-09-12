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
        <AddSites addSite={addSite} />,
        <FilterSearch setText={setText} enterPressed={enterPressed} />,
      ]}
    />
  );
};

export default SitesTools;
