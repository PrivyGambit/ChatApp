// "start": "webpack-dev-server --config webpack-dev.config.babel.js --hot --progress --colors --port 3000 --inline",

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const PATHS = {
    styles: path.join(__dirname, '/app/styles/main.js'),
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, '/public')
}

const styles = {
    name: 'client',
    entry: [ PATHS.styles ],
    output: {
        path: path.join(__dirname, 'public/'),
        filename: 'client.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css-loader')
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        hot: true,
        inline: true,
        progress: true,
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    resolve: {
        root: __dirname
    }
}

const developmentConfig = {
    entry: [
      path.join(__dirname, '/app/browser.js')
    ],
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
            }
        ]
    },
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: '',
        hot: true,
        inline: true,
        progress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
}

module.exports =  developmentConfig
