const WebpackConfigBuilder = require('./build.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = WebpackConfigBuilder({
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()],
});
