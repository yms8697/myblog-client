const path = require('path')
const HTMLPlugin = require('html-webpack-plugin') 
const isDev = process.env.NODE_ENV === 'development'
const config = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/public'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HTMLPlugin()
    ]
}
if (isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: '8000',
        contentBase: path.join(__dirname, '../dist'),
        //hot: true,
        overlay: {
            errors: true
        },
        publicPath: '/public',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
}
module.exports = config