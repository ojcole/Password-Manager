import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        maxWidth: '100%',
      },
    },
  },
  spacing: 12,
});
