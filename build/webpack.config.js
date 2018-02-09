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
    ],
  },
  plugins: [
    new HTMLPlugin(),
  ],
}
if (isDev) {
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
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin)//eslint-disable-line
}
module.exports = config
