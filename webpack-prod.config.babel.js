import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '../app/index.html',
    filename: 'index.html',
    inject: 'body',
})

const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})

const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        HtmlWebpackPluginConfig,
        productionPlugin
    ]
}


module.exports = productionConfig
