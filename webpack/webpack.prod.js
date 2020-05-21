const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isStaging = env === 'staging';
const optimizeBuild = isProd || isStaging;

module.exports = {
    entry: {
        main: './app/main.js',
        search: './app/search.js'
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../static/app'),
        filename: '[name].bundle.js',
        publicPath: '/static/app',
    },
    resolve: {
        alias: {
            environment: path.resolve(__dirname, "../app/config/production.js")
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
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader'
                  }
                ]
              }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CompressionPlugin({
            algorithm: "gzip",
            compressionOptions: {
                numiterations: 15
            },
            minRatio: 0.99
        })
    ],
    target: 'web',
    stats: 'normal'
}