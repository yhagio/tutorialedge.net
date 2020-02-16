const path = require('path');

module.exports = {
    entry: './app/index.ts',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../static/app'),
        filename: '[name].bundle.js',
        publicPath: __dirname + '../static/app',
    },
    resolve: {
        alias: {
            environment: path.resolve(__dirname, "../app/config/production.ts")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    target: 'web',
    stats: 'normal'
} 