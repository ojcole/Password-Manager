import { IpcMainEvent, clipboard } from 'electron';

export const clearClipboard = (__: IpcMainEvent) => {
  clipboard.clear();
};
