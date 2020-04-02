import { ipcMain } from 'electron';
import { messageMapping } from './types';

export default () => {
  messageMapping.forEach((func, channel) => {
    ipcMain.on(channel, (event, arg) => {
      func(event, arg);
    });
  });
};
