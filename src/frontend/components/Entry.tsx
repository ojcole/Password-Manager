import React, { useState } from 'react';
import Main from './Main';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme, darkTheme } from './MuiTheme';
import Body from './Body';

const Entry: React.FunctionComponent = () => {
  const [dark, setDark] = useState(true);

  const settings = {
    toggleDark: () => setDark(!dark),
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Body>
        <Main settings={settings} />
      </Body>
    </ThemeProvider>
  );
};

export default Entry;
