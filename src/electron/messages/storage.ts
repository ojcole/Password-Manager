import { IpcMainInvokeEvent } from 'electron';
import { loadSites } from '../store';

export default (__: IpcMainInvokeEvent, _: any) => {
  const sites = loadSites();

  return sites;
};
