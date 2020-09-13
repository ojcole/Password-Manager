import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { Brightness4, Publish, GetApp } from '@material-ui/icons';
import { SettingsProps } from './types';
import { importConfig, exportConfig } from '../messages/senders';

const SettingsBar: React.FunctionComponent<SettingsProps> = ({
  settings,
  loadConfig,
}) => {
  const { toggleDark } = settings;

  return (
    <Grid container justify="center">
      <Grid item>
        <IconButton onClick={toggleDark}>
          <Brightness4 />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={exportConfig(console.log)}>
          <Publish />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton onClick={importConfig(loadConfig)}>
          <GetApp />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SettingsBar;
