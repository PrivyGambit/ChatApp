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

const base = {
    name: 'js',
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style-loader',
                    'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
                    'postcss-loader'
                ]
            }
        ]
    },
    resolve: {
        root: path.resolve('./app')
    },
    stats: {
        colors: true,
        reasons: true,
        chunks: false
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

export default Object.assign({}, base,
    isProduction === true ? productionConfig : developmentConfig
)
