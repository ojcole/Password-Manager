import { IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import {
  MsgChannel,
  STORAGE_MSG_GET_SEND,
  STORAGE_MSG_PUT_SEND,
  STORAGE_SETTINGS_PUT_SEND,
  STORAGE_SETTINGS_GET_SEND,
  CLIPBOARD_CLEAR_SEND,
  IMPORT_SETTINGS_SEND,
  EXPORT_SETTINGS_SEND,
} from '../../messages/types';
import { loadSitesHandle, saveSitesHandle } from './storage';
import {
  saveSettingsHandle,
  loadSettingsHandle,
  loadConfigFromFileHandle,
  saveConfigToFile,
} from './settings';
import { clearClipboard } from './clipboard';

export const messageMapping = new Map<
  MsgChannel,
  (event: IpcMainEvent, arg: any) => void
>([
  [STORAGE_MSG_PUT_SEND, saveSitesHandle],
  [STORAGE_SETTINGS_PUT_SEND, saveSettingsHandle],
  [CLIPBOARD_CLEAR_SEND, clearClipboard],
]);

export const handleMapping = new Map<
  MsgChannel,
  (event: IpcMainInvokeEvent, arg: any) => void
>([
  [STORAGE_MSG_GET_SEND, loadSitesHandle],
  [STORAGE_SETTINGS_GET_SEND, loadSettingsHandle],
  [IMPORT_SETTINGS_SEND, loadConfigFromFileHandle],
  [EXPORT_SETTINGS_SEND, saveConfigToFile],
]);
