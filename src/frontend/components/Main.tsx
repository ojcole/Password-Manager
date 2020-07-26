import React, { useState, useEffect } from 'react';
import {
  generatePassword,
  combinePasswords,
} from '../../generation/generation';
import SiteTable from './SiteTable';
import { SiteTableRow, MainProps } from './types';
import PasswordInputs from './PasswordInputs';
import Breaker from './Breaker';
import escapeStringRegexp from 'escape-string-regexp';
import PasswordDisplay from './PasswordDisplay';
import { symbols } from '../../generation/constants';
import GridItemFlex from './GridItemFlex';
import MainGrid from './MainGrid';
import { sendLoadSites, sendSaveSites } from '../messages/senders';
import SettingsBar from './SettingsBar';
import SitesTools from './SitesTools';

const filterSites = (
  sites: SiteTableRow[],
  pattern: string
): SiteTableRow[] => {
  const regex = new RegExp(`.*${escapeStringRegexp(pattern)}.*`);

  return sites.filter((elem) => regex.test(elem.site));
};

const filterAndSet = (
  sites: SiteTableRow[],
  setSites: (sites: SiteTableRow[]) => void
) => (id: number) => {
  setSites(sites.filter((elem) => elem.id !== id));
};

const Main: React.FunctionComponent<MainProps> = ({ settings }) => {
  const [selected, setSelected] = useState(-1);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [content, setContent] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sites, setSites] = useState<SiteTableRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  const addSite = (site: string) => {
    setSites((sites) => {
      const newRow: SiteTableRow = {
        site,
        id: sites.reduce((prev, curr) => Math.max(prev, curr.id), 0) + 1,
      };

      return [...sites, newRow];
    });
  };

  useEffect(() => {
    sendLoadSites((sites) => {
      setSites(sites);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      sendSaveSites(sites);
    }
  }, [sites]);

  useEffect(() => {
    const website = sites.find((elem) => elem.id === selected) || {
      site: '',
      id: -1,
    };
    const master = combinePasswords(pass1, pass2);
    generatePassword(website.site, master, symbols).then((content) => {
      setContent(content);
    });
  }, [pass1, pass2, selected]);

  const passwordSetters = [setPass1, setPass2];
  const passwordValues = [pass1, pass2];
  const filteredSites = filterSites(sites, filterText);

  return (
    <MainGrid paddingSpacing={2}>
      <GridItemFlex basis>
        <SettingsBar settings={settings} />
      </GridItemFlex>
      <GridItemFlex basis>
        <PasswordInputs
          passwordSetters={passwordSetters}
          passwordValues={passwordValues}
        />
        <Breaker />
      </GridItemFlex>
      <GridItemFlex basis>
        <SitesTools setText={setFilterText} addSite={addSite} />
      </GridItemFlex>
      <GridItemFlex grow shrink minHeight={200} basis>
        <SiteTable
          rows={filteredSites}
          selected={selected}
          chooseSelected={setSelected}
          deleteRow={filterAndSet(sites, setSites)}
        ></SiteTable>
      </GridItemFlex>
      <GridItemFlex basis>
        <Breaker />
        <PasswordDisplay content={content} passwordSetters={passwordSetters} />
      </GridItemFlex>
    </MainGrid>
  );
};

export default Main;
