import { IpcRendererEvent } from 'electron';
import { MsgChannel, STORAGE_MSG_REPLY } from '../../messages/types';
import storage from './storage';

export const messageMapping = new Map<
  MsgChannel,
  (event: IpcRendererEvent, arg: any) => void
>([[STORAGE_MSG_REPLY, storage]]);
