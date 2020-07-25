import { SiteTableRow } from '../components/types';
import { Site } from '../../electron/types';
import {
  STORAGE_MSG_GET_SEND,
  STORAGE_MSG_PUT_SEND,
} from '../../messages/types';
const { ipcRenderer } = window.require('electron');

export const sendLoadSites = (setter: (rows: SiteTableRow[]) => void) => {
  ipcRenderer.invoke(STORAGE_MSG_GET_SEND).then((res: Site[]) => {
    setter(res.map((elem, i: number) => Object.assign(elem, { id: i })));
  });
};

export const sendSaveSites = (siteRows: SiteTableRow[]) => {
  const sites: Site[] = siteRows.map(({ id, ...rest }) => rest);

  console.log(sites);

  ipcRenderer.send(STORAGE_MSG_PUT_SEND, sites);
};
