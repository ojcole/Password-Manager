import React, { useState, useEffect } from 'react';
import {
  generatePassword,
  combinePasswords,
} from '../../generation/generation';
import SiteTable from './SiteTable';
import { SiteTableRow, MainProps, defaultSiteTableRow } from './types';
import PasswordInputs from './PasswordInputs';
import Breaker from './Breaker';
import escapeStringRegexp from 'escape-string-regexp';
import PasswordDisplay from './PasswordDisplay';
import { limitedSymbols, symbols } from '../../generation/constants';
import GridItemFlex from './GridItemFlex';
import MainGrid from './MainGrid';
import { sendLoadSites, sendSaveSites } from '../messages/senders';
import SettingsBar from './SettingsBar';
import SitesTools from './SitesTools';
import { compareSites, Config, Site } from '../../electron/types';
import { sitesToRows } from '../helpers/sites';
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

const filterSites = (
  sites: SiteTableRow[],
  pattern: string
): SiteTableRow[] => {
  const regex = new RegExp(`.*${escapeStringRegexp(pattern).toLowerCase()}.*`);

  return sites.filter((elem) => regex.test(elem.site.toLowerCase()));
};

const deleteSite =
  (
    sites: SiteTableRow[],
    setSites: (sites: SiteTableRow[]) => void,
    siteSet: Map<string, number>
  ) =>
  (id: number) => {
    setSites(
      sites.filter((elem) => {
        if (elem.id === id) {
          siteSet.delete(elem.site);
        }

        return elem.id !== id;
      })
    );
  };

const useStyles = makeStyles((theme: Theme) => {
  const bgColor =
    theme.palette.grey[theme.palette.type === 'light' ? 300 : 900];

  return createStyles({
    heading: {
      width: '100%',
      color: theme.palette.getContrastText(bgColor),
      backgroundColor: bgColor,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  });
});

const THeader: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.heading}>
      <Typography variant="h6">Sites</Typography>
    </div>
  );
};

const Main: React.FunctionComponent<MainProps> = ({ settings }) => {
  const [selected, setSel] = useState(-1);
  const [animate, setAnimated] = useState(false);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [content, setContent] = useState('');
  const [filterText, setFilterText] = useState('');
  const [loaded, setLoaded] = useState(false);

  const setSelected = (i: number) => {
    setAnimated(true);
    setSel(i);
    setTimeout(() => setAnimated(false));
  };

  const [siteSet, setSiteSet] = useState<Map<string, number>>(
    new Map<string, number>()
  );
  const [sites, setSites] = useState<SiteTableRow[]>([]);

  const loadAllSites = (sites: SiteTableRow[]) => {
    setSites(sites);

    setSiteSet((siteMap) => {
      const newSiteSet = new Map(siteMap);

      sites.forEach(({ site, id }) => {
        newSiteSet.set(site, id);
      });

      return newSiteSet;
    });

    setLoaded(true);
  };

  const addSite = (site: string): boolean => {
    const num = siteSet.get(site);
    if (num !== undefined) {
      setSelected(num);
      return false;
    }

    setSites((sites) => {
      const newRow: SiteTableRow = {
        site,
        length: 32,
        limitedCharset: false,
        id: sites.reduce((prev, curr) => Math.max(prev, curr.id), 0) + 1,
      };

      setSiteSet((sites) => new Map(sites).set(site, newRow.id));
      setSelected(newRow.id);

      const newSites = [...sites, newRow];
      newSites.sort(compareSites);

      return newSites;
    });

    return true;
  };

  const updateSite = (id: number, updatedSite: Site) => {
    setSites((s) => {
      const newSites = [...s];

      const updatedSites = newSites.map((site) => {
        const newSite = Object.assign({}, site);
        if (site.id === id) {
          newSite.length = updatedSite.length;
          newSite.limitedCharset = updatedSite.limitedCharset;
        }
        return newSite;
      });

      updatedSites.sort(compareSites);

      return updatedSites;
    });
  };

  useEffect(() => {
    sendLoadSites(loadAllSites);
  }, []);

  useEffect(() => {
    if (loaded) {
      sendSaveSites(sites);
    }
  }, [sites]);

  useEffect(() => {
    const website: SiteTableRow =
      sites.find((elem) => elem.id === selected) || defaultSiteTableRow;
    const master = combinePasswords(pass1, pass2);
    const syms = website.limitedCharset ? limitedSymbols : symbols;
    generatePassword(website.site, master, syms, website.length).then(
      (content) => {
        setContent(content);
      }
    );
  }, [pass1, pass2, selected, sites]);

  const passwordSetters = [setPass1, setPass2];
  const passwordValues = [pass1, pass2];
  const filteredSites = filterSites(sites, filterText);

  const selectIfOne = () => {
    if (filteredSites.length === 1) {
      setSelected(filteredSites[0].id);
    }
  };

  const loadConfig = (config: Config) => {
    loadAllSites(sitesToRows(config.sites));
  };

  return (
    <MainGrid paddingSpacing={2}>
      <GridItemFlex basis>
        <SettingsBar settings={settings} loadConfig={loadConfig} />
      </GridItemFlex>
      <GridItemFlex basis>
        <PasswordInputs
          passwordSetters={passwordSetters}
          passwordValues={passwordValues}
        />
      </GridItemFlex>
      <GridItemFlex basis>
        <SitesTools
          setText={setFilterText}
          addSite={addSite}
          enterPressed={selectIfOne}
        />
      </GridItemFlex>
      <THeader />
      <GridItemFlex grow shrink minHeight={200} basis>
        <SiteTable
          rows={filteredSites}
          selected={selected}
          chooseSelected={setSelected}
          deleteRow={deleteSite(sites, setSites, siteSet)}
          updateRow={updateSite}
        />
      </GridItemFlex>
      <GridItemFlex basis>
        <Breaker />
        <PasswordDisplay
          content={content}
          passwordSetters={passwordSetters}
          animate={animate}
        />
      </GridItemFlex>
    </MainGrid>
  );
};

export default Main;
