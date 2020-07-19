import { ipcMain } from 'electron';
import { messageMapping, handleMapping } from './types';

export default () => {
  messageMapping.forEach((func, channel) => {
    ipcMain.on(channel, func);
  });

  handleMapping.forEach((func, channel) => {
    ipcMain.handle(channel, func);
  });
};
