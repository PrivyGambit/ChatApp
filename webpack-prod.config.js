import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: '../app/index.html',
    filename: 'index.html',
    inject: 'body',
})


const productionConfig = {
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify('production')
          }
        })
    ]
}


module.exports = productionConfig
