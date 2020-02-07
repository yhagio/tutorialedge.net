const path = require('path');
const env = process.env.NODE_ENV;
const isProd = env === 'production';
const isStaging = env === 'staging';

module.exports = {
    entry: './app/index.ts',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'static/app'),
        filename: '[name].bundle.js',
        publicPath: '/static/app',
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