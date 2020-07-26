import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { Brightness4 } from '@material-ui/icons';
import { SettingsProps } from './types';

const SettingsBar: React.FunctionComponent<SettingsProps> = ({ settings }) => {
  const { toggleDark } = settings;

  return (
    <Grid container justify="center">
      <Grid item>
        <IconButton onClick={toggleDark}>
          <Brightness4 />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SettingsBar;
