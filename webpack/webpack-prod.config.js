const productionConfig = {
    devtool: 'cheap-module-source-map',
    plugins: [
        HtmlWebpackPluginConfig,
        productionPlugin
    ]
}

modules.exports = productionConfig
