import Store from 'electron-store';
import {
  Site,
  Settings,
  isSiteArray,
  isSettings,
  defaultSettings,
} from './types';

const defaultSites: Site[] = [
  // {
  //   site: 'facebook.com',
  // },
  // {
  //   site: 'google.com',
  // },
  // {
  //   site: 'amazon.com',
  // },
  // {
  //   site: 'ebay.com',
  // },
];

const store = new Store();

export const setupStore = () => {
  const sites = loadSites();

  if (sites === undefined) {
    store.set<string>('sites', defaultSites);
  }

  return store;
};

function loadGeneric<T>(key: string, def: T, check: (obj: any) => obj is T): T {
  const storedData = store.get<string>(key);
  if (storedData !== undefined && check(storedData)) {
    return storedData;
  }

  return def;
}

export const loadSites = () =>
  loadGeneric<Site[]>('sites', defaultSites, isSiteArray);
export const saveSites = (sites: Site[]) => store.set<string>('sites', sites);

export const loadSettings = () =>
  loadGeneric<Settings>('settings', defaultSettings, isSettings);
export const saveSettings = (settings: Settings) =>
  store.set<string>('settings', settings);
