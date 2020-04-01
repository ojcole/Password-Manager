import { entryHTML } from "./config.json";
import { app, BrowserWindow } from "electron";
import resolveHTML from "./resolveHTML";

const createWindow = () => {
    const window = new BrowserWindow({
        width: 100,
        height: 100,
    });

    window.loadFile(resolveHTML(entryHTML));
};

app.whenReady().then(createWindow);
