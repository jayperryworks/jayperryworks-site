var Clean = require("clean-webpack-plugin"),
    webpack = require("webpack");

var modulePath = "/source/assets/javascripts";

// split output JS into "critical" (above-the-fold) scripts and the rest (which can be loaded on-demand)
module.exports = {
    entry: {
        critical: ["vendor/modernizr.js", "picturefill"],
        main: "." + modulePath + "/main.js",
    },
    resolve: {
        root: __dirname + modulePath,
    },
    output: {
        path: __dirname + '/.tmp/dist/javascripts',
        filename: "bundle.js",
    },
    module: {
        loaders: [
            {
                test: /source\/assets\/javascripts\/.*\.js$/,
                exclude: /node_modules|\.tmp|vendor/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'react'],
                },
            },
        ],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("critical", "critical.bundle.js"),
        new Clean(['.tmp/dist/javscripts']),
    ]
};
