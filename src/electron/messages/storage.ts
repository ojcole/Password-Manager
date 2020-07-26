import { IpcMainInvokeEvent, IpcMainEvent } from 'electron';
import { loadSites, saveSites } from '../store';
import { isSite } from '../types';

export const loadSitesHandle = (__: IpcMainInvokeEvent, _: any) => {
  const sites = loadSites();

  return sites;
};
export const saveSitesHandle = (__: IpcMainEvent, sites: any[]) => {
  if (sites.every(isSite)) {
    saveSites(sites);
  }
};
