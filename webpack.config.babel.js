import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body',
})

const PATHS = {
    styles: path.join(__dirname, '/app/styles/main.js'),
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, '/public')
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})

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
  plugins: [new ExtractTextPlugin('styles.css')],
  resolve: {
    root: __dirname
  }
}

const base = {
    name: 'js',
    context: __dirname,
    entry: [ './app/browser.js' ],
    output: {
        path: PATHS.build,
        filename: 'bundle.js',
        publicPath: '/public/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        root: path.resolve('./app')
    }
}

const developmentConfig = {
    devtool: 'cheap-module-inline-source-map',
    devServer: {
        contentBase: PATHS.build,
        hot: true,
        inline: true,
        progress: true,
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.HotModuleReplacementPlugin()
    ]
}

const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        HtmlWebpackPluginConfig,
        productionPlugin
    ]
}

const server = Object.assign({}, base,
    isProduction === true ? productionConfig : developmentConfig
)

module.exports = [ styles, server ]
