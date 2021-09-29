import { BrowserWindow, Size, screen } from 'electron';
import resolveHTML from './resolveHTML';
import config from './config.json';

const getDimensions = (): Size => screen.getPrimaryDisplay().workAreaSize;

export const createWindow = () => {
  const { width, height } = getDimensions();

  return new BrowserWindow({
    width: width * 0.6,
    height: height * 0.6,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    },
    show: false,
  });
};

export const initWindow = (window: BrowserWindow) => {
  window.maximize();

  const htmlFile = resolveHTML(config.entryHTML);

  window.loadFile(htmlFile);

  window.once('ready-to-show', () => {
    window.show();
  });
};
