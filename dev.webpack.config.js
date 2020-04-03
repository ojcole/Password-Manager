const WebpackConfigBuilder = require('./build.config');

module.exports = WebpackConfigBuilder({
  stats: 'errors-only',
  watch: true,
  mode: 'development',
});
