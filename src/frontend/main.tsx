import handler from './messages/handler';
import { render } from 'react-dom';
import React from 'react';
import Main from './components/Main';
import { ThemeProvider } from '@material-ui/core';
import MuiTheme from './components/MuiTheme';
// import { SiteTableRow } from './components/types';

handler();

const root = document.getElementById('root');

// const sites: SiteTableRow[] = [
//   {
//     site: 'facebook.com',
//   },
//   {
//     site: 'google.com',
//   },
//   {
//     site: 'amazon.com',
//   },
//   {
//     site: 'ebay.com',
//   },
// ].map((site, i) => Object.assign(site, { id: i }));

render(
  <ThemeProvider theme={MuiTheme}>
    <Main />
  </ThemeProvider>,
  root
);
