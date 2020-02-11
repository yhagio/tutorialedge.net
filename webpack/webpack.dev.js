const path = require('path');
const env = process.env.NODE_ENV;

module.exports = {
    entry: [ './app/index.ts' ],
    output: {
        path: path.resolve(__dirname, '../static/app'),
        filename: '[name].bundle.js',
        publicPath: '../static/app',
    },
    resolve: {
        alias: {
            environment: path.resolve(__dirname, "../app/config/development.ts")
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /(node_modules)/,
            } 
        ]
    },
    target: 'web',
    stats: 'normal',
    watch: true
} 