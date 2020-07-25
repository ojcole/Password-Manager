import { BrowserWindow, Size, screen } from 'electron';
import resolveHTML from './resolveHTML';
import { entryHTML } from './config.json';

const getDimensions = (): Size => screen.getPrimaryDisplay().workAreaSize;

export const createWindow = () => {
  const { width, height } = getDimensions();

  return new BrowserWindow({
    width: width * 0.6,
    height: height * 0.6,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
};

export const initWindow = (window: BrowserWindow) => {
  window.maximize();

  const htmlFile = resolveHTML(entryHTML);

  window.loadFile(htmlFile);

  window.once('ready-to-show', () => {
    window.show();
  });
};
