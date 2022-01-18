import Store from 'electron-store';
import {
  Site,
  Settings,
  isSiteArray,
  isSettings,
  defaultSettings,
  Config,
} from './types';

const defaultSites: Site[] = [];
const defaultSiteLength = 32;
const defaultSiteLimitedCharset = false;

const setSitesDefaults = (obj: any): any => {
  const newSites: any[] = [];

  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      const copy = Object.assign({}, item);

      copy.length = copy.length || defaultSiteLength;
      copy.limitedCharset = copy.limitedCharset || defaultSiteLimitedCharset;

      newSites.push(copy);
    });
  }

  return newSites;
};

const store = new Store();

export const setupStore = () => {
  const sites = loadSites();

  if (sites === undefined) {
    store.set<string>('sites', defaultSites);
  }

  return store;
};

function loadGeneric<T>(
  key: string,
  def: T,
  check: (obj: any) => obj is T,
  defaults: (obj: any) => any
): T {
  const storedData = store.get<string>(key);
  const cleanedData = defaults(storedData);
  if (cleanedData !== undefined && check(cleanedData)) {
    return cleanedData;
  }

  return def;
}

export const loadSites = () =>
  loadGeneric<Site[]>('sites', defaultSites, isSiteArray, setSitesDefaults);
export const saveSites = (sites: Site[]) => store.set<string>('sites', sites);

export const loadSettings = () =>
  loadGeneric<Settings>('settings', defaultSettings, isSettings, (a) => a);
export const saveSettings = (settings: Settings) =>
  store.set<string>('settings', settings);

export const loadConfig = (): Config => ({
  sites: loadSites(),
  settings: loadSettings(),
});
