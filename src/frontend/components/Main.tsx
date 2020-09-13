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
  const regex = new RegExp(`.*${escapeStringRegexp(pattern).toLowerCase()}.*`);

  return sites.filter((elem) => regex.test(elem.site.toLowerCase()));
};

const deleteSite = (
  sites: SiteTableRow[],
  setSites: (sites: SiteTableRow[]) => void,
  siteSet: Map<string, number>
) => (id: number) => {
  setSites(
    sites.filter((elem) => {
      if (elem.id === id) {
        siteSet.delete(elem.site);
      }

      return elem.id !== id;
    })
  );
};

const Main: React.FunctionComponent<MainProps> = ({ settings }) => {
  const [selected, setSelected] = useState(-1);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [content, setContent] = useState('');
  const [filterText, setFilterText] = useState('');
  const [loaded, setLoaded] = useState(false);

  const [siteSet, setSiteSet] = useState<Map<string, number>>(
    new Map<string, number>()
  );
  const [sites, setSites] = useState<SiteTableRow[]>([]);

  const addSite = (site: string): boolean => {
    const num = siteSet.get(site);
    if (num !== undefined) {
      setSelected(num);
      return false;
    }

    setSites((sites) => {
      const newRow: SiteTableRow = {
        site,
        id: sites.reduce((prev, curr) => Math.max(prev, curr.id), 0) + 1,
      };

      setSiteSet((sites) => new Map(sites).set(site, newRow.id));
      setSelected(newRow.id);

      return [...sites, newRow];
    });

    return true;
  };

  useEffect(() => {
    sendLoadSites((sites) => {
      setSites(sites);

      setSiteSet((siteMap) => {
        const newSiteSet = new Map(siteMap);

        sites.forEach(({ site, id }) => {
          newSiteSet.set(site, id);
        });

        return newSiteSet;
      });

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

  const selectIfOne = () => {
    if (filteredSites.length === 1) {
      setSelected(filteredSites[0].id);
    }
  };

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
        <SitesTools
          setText={setFilterText}
          addSite={addSite}
          enterPressed={selectIfOne}
        />
      </GridItemFlex>
      <GridItemFlex grow shrink minHeight={200} basis>
        <SiteTable
          rows={filteredSites}
          selected={selected}
          chooseSelected={setSelected}
          deleteRow={deleteSite(sites, setSites, siteSet)}
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
