import { IpcRendererEvent } from 'electron';
import { MsgChannel } from '../../messages/types';

export const messageMapping = new Map<
  MsgChannel,
  (event: IpcRendererEvent, arg: any) => void
>([]);
