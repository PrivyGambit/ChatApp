import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

//types of webpack config (partial)
import productionConfig from './webpack-prod.config.babel'
import developmentConfig from './webpack-dev.config.babel'

const PATHS = {
    styles: path.join(__dirname, '/app/styles/main.js'),
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, '/public')
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

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
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract( "style", "css!sass")
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


const server = Object.assign({}, base,
    isProduction === true ? productionConfig : developmentConfig
)

module.exports = [ styles, server ]
