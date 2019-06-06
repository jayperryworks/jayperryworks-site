const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const buildPath = '.tmp/javascripts'

// split output JS into "critical" (above-the-fold) scripts and the rest (which can be loaded on-demand)
module.exports = {
  entry: {
    critical: ['picturefill']
  },
  output: {
    path: path.resolve(__dirname, buildPath),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'main.js',
//     path: path.resolve(__dirname, 'dist')
//   }
// };
