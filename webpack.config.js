var path = require('path'),
    Clean = require("clean-webpack-plugin"),
    webpack = require("webpack");

var buildPath = '.tmp/dist/javascripts'

// split output JS into "critical" (above-the-fold) scripts and the rest (which can be loaded on-demand)
module.exports = {
  entry: {
    critical: ['picturefill'],
    main: './source/assets/javascripts/main.js',
  },
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /source\/assets\/javascripts\/.*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new Clean(['.tmp/dist/javscripts'])
  ]
};
