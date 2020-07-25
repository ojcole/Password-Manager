const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
  srcPath,
  buildPath,
  htmlPath,
  electronPath,
  frontendPath,
} = require('./paths');
const outputConfig = {
  path: buildPath,
  publicPath: buildPath,
};

const WebpackConfigBuilder = (config, extras) => {
  const baseConfig = Object.assign(
    {},
    {
      mode: 'development',
      entry: {
        main: extras.main,
        frontend: path.resolve(frontendPath, 'main.tsx'),
      },
      plugins: [],
      module: {
        rules: [
          {
            test: /\.tsx?$/i,
            include: [srcPath],
            exclude: [/node_modules/],
            loader: 'babel-loader',
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/',
                },
              },
            ],
          },
        ],
      },
      resolve: {
        modules: ['node_modules', electronPath],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
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
      stats: {
        assets: true,
        assetsSort: '!size',
        builtAt: false,
        hash: false,
        cached: true,
        children: false,
        chunks: false,
        modules: false,
      },
      parallelism: 4,
      profile: true,
      cache: true,
      optimization: {
        usedExports: true,
      },
    },
    config
  );

  const electronTarget = Object.assign({}, baseConfig, {
    entry: path.resolve(electronPath, extras.main),
    target: 'electron-main',
    output: Object.assign({}, outputConfig, {
      filename: 'main.js',
    }),
  });

  const frontendTarget = Object.assign({}, baseConfig, {
    entry: path.resolve(frontendPath, 'main.tsx'),
    target: 'web',
    output: Object.assign({}, outputConfig, {
      filename: 'frontend.js',
    }),
    plugins: [
      ...baseConfig.plugins,
      new HTMLWebpackPlugin({
        template: path.resolve(htmlPath, 'index.html'),
        loader: 'ejs-compiled-loader',
        inject: false,
        minify: true,
      }),
    ],
  });

  return [frontendTarget, electronTarget];
};

module.exports = WebpackConfigBuilder;
