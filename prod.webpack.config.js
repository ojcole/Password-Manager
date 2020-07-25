const WebpackConfigBuilder = require('./build.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');
const { electronPath } = require('./paths');

module.exports = WebpackConfigBuilder(
  {
    mode: 'production',
    plugins: [
      // new BundleAnalyzerPlugin()
    ],
  },
  { main: path.resolve(electronPath, 'mainProd.ts') }
);
