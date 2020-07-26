import { app, BrowserWindow } from 'electron';
import handler from './messages/handler';
import { setupStore } from './store';
import { initWindow, createWindow } from './window';

const mainSetup = (transformer: (window: BrowserWindow) => void) => {
  setupStore();
  handler();

  app.allowRendererProcessReuse = true;
  app.whenReady().then(() => {
    const window = createWindow();

    transformer(window);

    initWindow(window);
  });
};

export default mainSetup;
