import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { MsgChannel, STORAGE_MSG_GET_SEND } from '../../messages/types';
import storage from './storage';

export const messageMapping = new Map<
  MsgChannel,
  (event: IpcMainEvent, arg: any) => void
>([]);

export const handleMapping = new Map<
  MsgChannel,
  (event: IpcMainInvokeEvent, arg: any) => void
>([[STORAGE_MSG_GET_SEND, storage]]);
