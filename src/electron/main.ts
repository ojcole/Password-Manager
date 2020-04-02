import { entryHTML } from './config.json';
import { app, BrowserWindow } from 'electron';
import resolveHTML from './resolveHTML';
import handler from './messages/handler';

const createWindow = () => {
  const window = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const htmlFile = resolveHTML(entryHTML);

  window.loadFile(htmlFile);
};

handler();

app.whenReady().then(createWindow);
