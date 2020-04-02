import { messageMapping } from './types';

const { ipcRenderer } = window.require('electron');

export default () => {
  messageMapping.forEach((func, channel) => {
    ipcRenderer.on(channel, (event, arg) => {
      func(event, arg);
    });
  });
};
