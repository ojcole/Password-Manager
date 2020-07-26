import { IpcMainInvokeEvent, IpcMainEvent } from 'electron';
import { loadSettings, saveSettings } from '../store';
import { isSettings } from '../types';

export const loadSettingsHandle = (__: IpcMainInvokeEvent, _: any) => {
  const settings = loadSettings();

  return settings;
};

export const saveSettingsHandle = (__: IpcMainEvent, settings: any) => {
  if (isSettings(settings)) {
    saveSettings(settings);
  }
};
