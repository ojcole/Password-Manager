import React, { useState, useEffect } from 'react';
import {
  generatePassword,
  combinePasswords,
} from '../../generation/generation';
import SiteTable from './SiteTable';
import { SiteTableRow } from './types';
import PasswordInputs from './PasswordInputs';
import Breaker from './Breaker';
import escapeStringRegexp from 'escape-string-regexp';
import PasswordDisplay from './PasswordDisplay';
import FilterSearch from './FilterSearch';
import { symbols } from '../../generation/constants';
import { STORAGE_MSG_GET_SEND } from '../../messages/types';
import { Site } from '../../electron/types';
import GridItemFlex from './GridItemFlex';
import MainGrid from './MainGrid';
const { ipcRenderer } = window.require('electron');

const filterSites = (
  sites: SiteTableRow[],
  pattern: string
): SiteTableRow[] => {
  const regex = new RegExp(`.*${escapeStringRegexp(pattern)}.*`);

  return sites.filter((elem) => regex.test(elem.site));
};

const Main: React.FunctionComponent = () => {
  const [selected, setSelected] = useState(-1);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [content, setContent] = useState('');
  const [filterText, setFilterText] = useState('');
  const [sites, setSites] = useState<SiteTableRow[]>([]);

  useEffect(() => {
    ipcRenderer.invoke(STORAGE_MSG_GET_SEND).then((res: Site[]) => {
      setSites(res.map((elem, i: number) => Object.assign(elem, { id: i })));
    });
  }, []);

  useEffect(() => {
    const website = sites.find((elem) => elem.id == selected) || {
      site: '',
      id: -1,
    };
    const master = combinePasswords(pass1, pass2);
    generatePassword(website.site, master, symbols).then((content) => {
      setContent(content);
    });
  }, [pass1, pass2, selected]);

  const filteredSites = filterSites(sites, filterText);

  return (
    <MainGrid>
      <GridItemFlex basis>
        <PasswordInputs passwordSetters={[setPass1, setPass2]} />
        <Breaker />
      </GridItemFlex>
      <GridItemFlex basis>
        <FilterSearch setText={setFilterText} />
      </GridItemFlex>
      <GridItemFlex grow shrink minHeight={200} basis={'auto'}>
        <SiteTable
          rows={filteredSites}
          selected={selected}
          chooseSelected={setSelected}
        ></SiteTable>
      </GridItemFlex>
      <GridItemFlex basis>
        <Breaker />
        <PasswordDisplay content={content} />
      </GridItemFlex>
    </MainGrid>
  );
};

export default Main;
