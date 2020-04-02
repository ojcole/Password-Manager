import { IpcMainEvent } from 'electron';
import { MsgChannel, STORAGE_MSG_SEND } from '../../messages/types';
import storage from './storage';

export const messageMapping = new Map<
  MsgChannel,
  (event: IpcMainEvent, arg: any) => void
>([[STORAGE_MSG_SEND, storage]]);
