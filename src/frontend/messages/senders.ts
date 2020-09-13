import { SiteTableRow, SettingsProps } from '../components/types';
import { Site, Settings, isConfig } from '../../electron/types';
import {
  STORAGE_MSG_GET_SEND,
  STORAGE_MSG_PUT_SEND,
  STORAGE_SETTINGS_GET_SEND,
  STORAGE_SETTINGS_PUT_SEND,
  CLIPBOARD_CLEAR_SEND,
  IMPORT_SETTINGS_SEND,
  EXPORT_SETTINGS_SEND,
} from '../../messages/types';
import { sitesToRows } from '../helpers/sites';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export const sendLoadSites = (setter: (rows: SiteTableRow[]) => void) => {
  ipcRenderer.invoke(STORAGE_MSG_GET_SEND).then((res: Site[]) => {
    setter(sitesToRows(res));
  });
};

export const sendSaveSites = (siteRows: SiteTableRow[]) => {
  const sites: Site[] = siteRows.map(({ id, ...rest }) => rest);

  ipcRenderer.send(STORAGE_MSG_PUT_SEND, sites);
};

export const sendLoadSettings = (setter: (settings: Settings) => void) => {
  ipcRenderer.invoke(STORAGE_SETTINGS_GET_SEND).then(setter);
};

export const sendSaveSettings = (settings: Settings) => {
  ipcRenderer.send(STORAGE_SETTINGS_PUT_SEND, settings);
};

export const sendClearClipboard = () => {
  ipcRenderer.send(CLIPBOARD_CLEAR_SEND);
};

export const importConfig = (loader: SettingsProps['loadConfig']) => () => {
  ipcRenderer.invoke(IMPORT_SETTINGS_SEND).then((config) => {
    if (isConfig(config)) {
      loader(config);
    }
  });
};

export const exportConfig = (
  callback: (path: string | boolean) => void
) => () => {
  ipcRenderer.invoke(EXPORT_SETTINGS_SEND).then((obj) => {
    if (typeof obj === 'string' || typeof obj === 'boolean') {
      callback(obj);
    }
  });
};
