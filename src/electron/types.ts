const isObject = (obj: any) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export interface Site {
  site: string;
}

export const defaultSites: Site[] = [];
export const isSite = (obj: any): obj is Site => isObject(obj) && 'site' in obj;
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
