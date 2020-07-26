import { IpcMainEvent, clipboard } from "electron";

export const clearClipboard = (__: IpcMainEvent) => {
    console.log("clearing");
    clipboard.writeText("");
}