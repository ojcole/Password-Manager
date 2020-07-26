import { createMuiTheme } from '@material-ui/core';
import merge from 'deepmerge';

const baseTheme = {
  overrides: {
    MuiGrid: {
      container: {
        maxWidth: '100%',
      },
    },
  },
  palette: {
    error: { main: '#cc0000' },
  },
  spacing: 12,
};

const buildTheme = (theme: object): object => {
  return merge(baseTheme, theme);
};

export const lightTheme = createMuiTheme(buildTheme({}));

export const darkTheme = createMuiTheme(
  buildTheme({
    palette: {
      type: 'dark',
    },
  })
);
