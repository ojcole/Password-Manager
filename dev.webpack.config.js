const WebpackConfigBuilder = require('./build.config');
const path = require('path');
const { electronPath } = require('./paths');

module.exports = WebpackConfigBuilder(
  {
    stats: 'errors-only',
    watch: true,
    mode: 'development',
  },
  { main: path.resolve(electronPath, 'mainDev.ts') }
);
