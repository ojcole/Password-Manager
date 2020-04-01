const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const tsPath = path.resolve(__dirname, 'src/ts');
const buildPath = path.resolve(__dirname, 'build');

module.exports = {
  mode: 'production',
  entry: './src/ts/main',
  output: {
    filename: 'main.js',
    path: buildPath,
    publicPath: buildPath,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [tsPath],
        exclude: [],
        loader: 'babel-loader',
      },
      // {
      //   test: /\.html$/,
      //   include: [path.resolve(__dirname, 'src/html')],
      //   exclude: [],
      //   loaders: ['html-loader'],
      // },
    ],
  },
  resolve: {
    modules: ['node_modules', tsPath],
    extensions: ['.ts', '.json'],
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 500000,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/html/index.html',
      loader: 'ejs-compiled-loader',
    }),
  ],
  node: {
    __dirname: false,
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'electron-main',
  stats: 'errors-only',
  parallelism: 4,
  profile: true,
  cache: true,
};
