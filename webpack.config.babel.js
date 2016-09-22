import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body',
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, '/public'),
}

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const base = {
  context: __dirname,
  entry: [
    // PATHS.app,
    './app/browser.js'
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
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
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin]
}

export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
)


// const path = require('path')
//
// module.exports = {
//   context: __dirname,
//   entry: './app/browser.js',
//   output: {
//     path: path.join(__dirname, '/public'),
//     filename: 'bundle.js',
//     publicPath: '/public/'
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx', '.json']
//   },
//   stats: {
//     colors: true,
//     reasons: true,
//     chunks: true
//   },
//   module: {
//     preLoaders: [
//       {
//         test: /\.jsx?$/,
//         loader: "eslint-loader",
//         exclude: /node_modules/
//       }
//     ],
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         loader: 'babel-loader'
//       },
//       {
//         test: /\.json$/,
//         loader: 'json-loader'
//       }
//     ]
//   }
// }
