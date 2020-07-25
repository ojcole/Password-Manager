import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import {
  MsgChannel,
  STORAGE_MSG_GET_SEND,
  STORAGE_MSG_PUT_SEND,
} from '../../messages/types';
import { load, save } from './storage';

export const messageMapping = new Map<
  MsgChannel,
  (event: IpcMainEvent, arg: any) => void
>([[STORAGE_MSG_PUT_SEND, save]]);

export const handleMapping = new Map<
  MsgChannel,
  (event: IpcMainInvokeEvent, arg: any) => void
>([[STORAGE_MSG_GET_SEND, load]]);
