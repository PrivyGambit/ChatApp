// "start": "webpack-dev-server --config webpack-dev.config.babel.js --hot --progress --colors --port 3000 --inline",

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body',
})

const developmentConfig = {
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        hot: true,
        inline: true,
        progress: true,
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = developmentConfig
