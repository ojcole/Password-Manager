import Store from 'electron-store';
import { Site } from './types';

const defaultSites: Site[] = [
  {
    site: 'facebook.com',
  },
  {
    site: 'google.com',
  },
  {
    site: 'amazon.com',
  },
  {
    site: 'ebay.com',
  },
];

const store = new Store();

export const setupStore = () => {
  const sites = loadSites();

  if (sites === undefined) {
    store.set<string>('sites', defaultSites);
  }

  return store;
};

export const loadSites = () => store.get<string>('sites');
