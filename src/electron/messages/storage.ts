import { IpcMainEvent } from 'electron';
import { STORAGE_MSG_REPLY } from '../../messages/types';

export default (event: IpcMainEvent, arg: any) => {
  console.log(arg);
  event.reply(STORAGE_MSG_REPLY, 'Hi');
};
