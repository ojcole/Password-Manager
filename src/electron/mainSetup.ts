import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import handler from './messages/handler';
import { setupStore } from './store';
import { initWindow, createWindow } from './window';
import log from "electron-log"

log.transports.file.level = 'info';
autoUpdater.logger = log;
log.info("Starting App...");

const mainSetup = (transformer: (window: BrowserWindow) => void) => {
  setupStore();
  handler();

  app.whenReady().then(() => {
    autoUpdater.checkForUpdatesAndNotify();

    const window = createWindow();

    transformer(window);

    initWindow(window);
  });
};

export default mainSetup;
