import { STORAGE_MSG_SEND } from '../messages/types';
import handler from './messages/handler';
import { render } from 'react-dom';
import React from 'react';
import Main from './components/Main';
import { ThemeProvider } from '@material-ui/core';
import MuiTheme from './components/MuiTheme';

const { ipcRenderer } = window.require('electron');

handler();

ipcRenderer.send(STORAGE_MSG_SEND, 'test');

const root = document.getElementById('root');

render(
  <ThemeProvider theme={MuiTheme}>
    <Main />
  </ThemeProvider>,
  root
);
