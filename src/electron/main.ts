import { entryHTML } from './config.json';
import { app, BrowserWindow } from 'electron';
import resolveHTML from './resolveHTML';
import handler from './messages/handler';

const createWindow = () => {
  const window = new BrowserWindow({
    width: 0,
    height: 0,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });

  window.maximize();

  const htmlFile = resolveHTML(entryHTML);

  window.loadFile(htmlFile);

  window.once('ready-to-show', () => {
    window.show();
  });
};

handler();

app.whenReady().then(createWindow);
