import {
  IpcMainInvokeEvent,
  IpcMainEvent,
  BrowserWindow,
  dialog,
} from 'electron';
import { loadSettings, saveSettings, loadConfig, saveSites } from '../store';
import { isSettings, Config, isConfig } from '../types';
import stringify from 'json-stringify-safe';
import { writeFileSync, readFileSync } from 'fs';

export const loadSettingsHandle = (__: IpcMainInvokeEvent, _: any) => {
  const settings = loadSettings();

  return settings;
};

export const saveSettingsHandle = (_: IpcMainEvent, settings: any) => {
  if (isSettings(settings)) {
    saveSettings(settings);
  }
};

export const loadConfigFromFileHandle = (
  __: IpcMainInvokeEvent,
  _: any
): Config | false => {
  const window = BrowserWindow.getFocusedWindow();

  if (window !== null) {
    const file = dialog.showOpenDialogSync(window, {
      properties: ['openFile'],
    });

    if (file !== undefined && file.length > 0) {
      const configData = readFileSync(file[0], 'utf-8');
      let config;

      try {
        config = JSON.parse(configData);
      } catch (_) {
        return false;
      }

      if (isConfig(config)) {
        saveSettings(config.settings);
        saveSites(config.sites);

        return config;
      }
    }
  }

  return false;
};

export const saveConfigToFile = (
  __: IpcMainInvokeEvent,
  _: any
): string | boolean => {
  const window = BrowserWindow.getFocusedWindow();
  const config = loadConfig();

  if (window === null) {
    return false;
  }

  const path = dialog.showSaveDialogSync(window, {
    defaultPath: '*/pm_config.json',
  });

  if (path === undefined) {
    return false;
  }

  const configString = stringify(config);

  try {
    writeFileSync(path, configString, 'utf-8');
  } catch (_) {
    return false;
  }

  return path;
};
