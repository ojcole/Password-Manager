import React, { useState, useEffect } from 'react';
import Main from './Main';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme, darkTheme } from './MuiTheme';
import Body from './Body';
import { sendLoadSettings, sendSaveSettings } from '../messages/senders';
import { Settings } from '../../electron/types';

const Entry: React.FunctionComponent = () => {
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    sendLoadSettings((settings) => {
      setSettings(settings);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded && settings !== null) {
      sendSaveSettings(settings);
    }
  }, [settings]);

  const updateSettings = (update: (state: Settings) => object) => {
    setSettings((state) => {
      if (state !== null) {
        return Object.assign({}, settings, update(state));
      }

      return state;
    });
  };

  const appSettings = {
    toggleDark: () => updateSettings((state) => ({ dark: !state.dark })),
  };

  return settings === null ? (
    <div></div>
  ) : (
    <ThemeProvider theme={settings.dark ? darkTheme : lightTheme}>
      <Body>
        <Main settings={appSettings} />
      </Body>
    </ThemeProvider>
  );
};

export default Entry;
