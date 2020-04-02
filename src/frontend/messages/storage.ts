import { IpcRendererEvent } from 'electron';

export default (event: IpcRendererEvent, arg: any) => {
  console.log(arg);
};
