import React from 'react';
import { IconButton, Grid, Tooltip } from '@material-ui/core';
import { Brightness4, Publish, GetApp } from '@material-ui/icons';
import { SettingsProps } from './types';
import { importConfig, exportConfig } from '../messages/senders';

const SettingsBar: React.FunctionComponent<SettingsProps> = ({
  settings,
  loadConfig,
}) => {
  const { toggleDark } = settings;

  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Tooltip title="Toggle Dark Mode" arrow>
          <IconButton onClick={toggleDark}>
            <Brightness4 />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Export Config" arrow>
          <IconButton onClick={exportConfig(console.log)}>
            <Publish />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <Tooltip title="Import Config" arrow>
          <IconButton onClick={importConfig(loadConfig)}>
            <GetApp />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default SettingsBar;
