import {
  IpcMainInvokeEvent,
  IpcMainEvent,
  BrowserWindow,
  dialog,
} from 'electron';
import { loadSettings, saveSettings, loadConfig, saveSites } from '../store';
import { isSettings, Config, isConfig, Site, compareSites } from '../types';
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

function last<A>(items: A[]) {
  return items[items.length - 1];
}

function flip<A, B, C>(func: (a: A, b: B) => C) {
  return (b: B, a: A) => func(a, b);
}

function compareLast<A>(
  items1: A[],
  items2: A[],
  comparator: (_: A, __: A) => number
) {
  return comparator(last(items1), last(items2));
}

const mergeConfigs = (myConfig: Config, newConfig: Config): Config => {
  const myConfigSites = [...myConfig.sites];
  const newConfigSites = [...newConfig.sites];

  myConfigSites.sort(flip(compareSites));
  newConfigSites.sort(flip(compareSites));

  const newSites: Site[] = [];
  while (myConfigSites.length > 0 && newConfigSites.length > 0) {
    if (
      myConfigSites.length > 0 &&
      newSites.length > 0 &&
      compareLast(myConfigSites, newSites, compareSites) == 0
    ) {
      myConfigSites.pop();
      continue;
    } else if (
      newConfigSites.length > 0 &&
      newSites.length > 0 &&
      compareLast(newConfigSites, newSites, compareSites) == 0
    ) {
      newConfigSites.pop();
      continue;
    }

    if (
      newConfigSites.length == 0 ||
      compareLast(myConfigSites, newConfigSites, compareSites) <= 0
    ) {
      newSites.push(Object.assign({}, last(myConfigSites)));
      myConfigSites.pop();
    } else {
      newSites.push(Object.assign({}, last(newConfigSites)));
      newConfigSites.pop();
    }
  }

  const resultingConfig: Config = {
    settings: Object.assign({}, myConfig.settings),
    sites: newSites,
  };

  return resultingConfig;
};

export const loadConfigFromFileHandle = (
  __: IpcMainInvokeEvent,
  _: any
): Config | false => {
  const window = BrowserWindow.getFocusedWindow();

  if (window !== null) {
    const file = dialog.showOpenDialogSync(window, {
      properties: ['openFile'],
      filters: [
        {
          name: '',
          extensions: ['json'],
        },
      ],
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
        const currentConfig = loadConfig();
        const combined = mergeConfigs(currentConfig, config);
        saveSettings(combined.settings);
        saveSites(combined.sites);

        return combined;
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
