const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: './app/main.js',
    output: {
        path: path.resolve(__dirname, '../static/app'),
        filename: '[name].bundle.js',
        publicPath: '/static/app',
    },
    resolve: {
        alias: {
            environment: path.resolve(__dirname, "../app/config/production.ts")
        }
    },
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /\.js?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    target: 'web',
    stats: 'normal'
}