var Clean = require("clean-webpack-plugin"),
    webpack = require("webpack");

var jsPath = "/source/assets/javascripts",
    cssPath = "/source/assets/stylesheets";

// split output JS into "critical" (above-the-fold) scripts and the rest (which can be loaded on-demand)
module.exports = {
  entry: {
    critical: ["vendor/modernizr.js", "picturefill"],
    main: "." + jsPath + "/main.js",
    styles: "." + cssPath + "/main.scss"
  },
  resolve: {
    root: __dirname + jsPath
  },
  output: {
    path: __dirname + '/.tmp/dist/javascripts',
    filename: "bundle.js"
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
    new webpack.optimize.CommonsChunkPlugin("critical", "critical.bundle.js"),
    new Clean(['.tmp/dist/javscripts'])
  ]
};
