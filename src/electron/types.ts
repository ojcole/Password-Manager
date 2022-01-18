const isObject = (obj: any) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export interface Site {
  site: string;
  length: number;
  limitedCharset: boolean;
}

export const compareSites = (a: Site, b: Site): number => {
  if (a.site < b.site) return -1;
  else if (a.site > b.site) return 1;
  else if (a.length < b.length) return -1;
  else if (a.length > b.length) return 1;
  else if (!a.limitedCharset && b.limitedCharset) return -1;
  else if (a.limitedCharset && !b.limitedCharset) return 1;
  return 0;
};

export const defaultSites: Site[] = [];
export const isSite = (obj: any): obj is Site =>
  isObject(obj) && 'site' in obj && 'length' in obj && 'limitedCharset' in obj;
export const isSiteArray = (obj: any): obj is Site[] =>
  Array.isArray(obj) && obj.every(isSite);

export interface Settings {
  dark: boolean;
}

export const defaultSettings: Settings = {
  dark: false,
};

export const isSettings = (obj: any): obj is Settings =>
  isObject(obj) && 'dark' in obj;

export interface Config {
  settings: Settings;
  sites: Site[];
}

export const defaultConfig: Config = {
  settings: defaultSettings,
  sites: defaultSites,
};

export const isConfig = (obj: any): obj is Config =>
  isObject(obj) &&
  'settings' in obj &&
  'sites' in obj &&
  isSettings(obj['settings']) &&
  isSiteArray(obj['sites']);
