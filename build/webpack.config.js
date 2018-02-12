const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/template.html'),
    }),
  ],
}
if (isDev) {
  // config.devtool = '#cheap-module-eval-source-map'
  // 热更新配置
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../src/index.js'),
    ],
  }
  // webpack-dev-server配置
  config.devServer = {
    host: 'localhost',
    port: '8000',
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    overlay: {
      errors: true,
    },
    open: true,
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html',
    },
    proxy: { '/api': 'http://localhost:3000' },
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin)//eslint-disable-line
}
module.exports = config
