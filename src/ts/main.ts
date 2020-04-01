import { entryHTML } from './config.json';
import { app, BrowserWindow } from 'electron';
import resolveHTML from './resolveHTML';

const createWindow = () => {
  const window = new BrowserWindow({
    width: 500,
    height: 500,
  });

  const htmlFile = resolveHTML(entryHTML);

  window.loadFile(htmlFile);
};

app.whenReady().then(createWindow);
