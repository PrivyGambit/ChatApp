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

modules.exports = developmentConfig
