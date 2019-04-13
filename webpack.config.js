const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isStaging = env === 'staging';
const optimizeBuild = isProd || isStaging;

module.exports = {
    entry: './app/main.js',
    mode: optimizeBuild ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, 'static/app'),
        filename: '[name].bundle.js',
        publicPath: '/static/app',
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
    devtool: !optimizeBuild && ' cheap-module-eval-source-map',
    target: 'web',
    stats: 'normal',
    watch: !optimizeBuild
}