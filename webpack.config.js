const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');
const htmlPath = path.resolve(srcPath, 'html');
const electronPath = path.resolve(srcPath, 'electron');
const frontendPath = path.resolve(srcPath, 'frontend');
const outputConfig = {
  path: buildPath,
  publicPath: buildPath,
};

const baseConfig = {
  mode: 'production',
  entry: {
    main: path.resolve(electronPath, 'main.ts'),
    frontend: path.resolve(frontendPath, 'main.ts'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [srcPath],
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
    modules: ['node_modules', electronPath],
    extensions: ['.ts', '.json'],
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 500000,
  },
  node: {
    __dirname: false,
    fs: 'empty',
  },
  devtool: 'source-map',
  context: __dirname,
  stats: 'errors-only',
  parallelism: 4,
  profile: true,
  cache: true,
};

const electronTarget = Object.assign({}, baseConfig, {
  entry: path.resolve(electronPath, 'main.ts'),
  target: 'electron-main',
  output: Object.assign({}, outputConfig, {
    filename: 'main.js',
  }),
});

const frontendTarget = Object.assign({}, baseConfig, {
  entry: path.resolve(frontendPath, 'main.ts'),
  target: 'web',
  output: Object.assign({}, outputConfig, {
    filename: 'frontend.js',
  }),
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(htmlPath, 'index.html'),
      loader: 'ejs-compiled-loader',
      inject: false,
      minify: true,
    }),
  ],
});

module.exports = [electronTarget, frontendTarget];
