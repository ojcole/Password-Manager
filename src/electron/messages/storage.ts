import { IpcMainInvokeEvent } from 'electron';
import { loadSites, saveSites } from '../store';
import { isSite } from '../types';

export const load = (__: IpcMainInvokeEvent, _: any) => {
  const sites = loadSites();

  return sites;
};
export const save = (__: IpcMainInvokeEvent, sites: any[]) => {
  if (sites.every(isSite)) {
    saveSites(sites);
  }
};
