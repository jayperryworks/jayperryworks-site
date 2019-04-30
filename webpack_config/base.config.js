// Build both 'modern' and 'legacy' javascript bundles using separate configs
// -> this is the base config, shared by both versions
// -> based on Philip Walton's examples at
// -> https://philipwalton.com/articles/deploying-es2015-code-in-production-today/

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  prodMode: process.env.NODE_ENV !== 'production',

  // config used in both modern and legacy configs
  config: {
    entry: {
      home: './source/assets/javascripts/home.js'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          test: /\.m?js(\?.*)?$/i,
          sourceMap: true,
          terserOptions: {
            safari10: true
          }
        })
      ]
    }
  },

  // output path for all files
  // -> relative to this file
  outputPath: path.resolve(__dirname, '../.tmp/javascripts'),

  // set up babel loader rules
  // -> pass in desired browser targets for specific build
  configureBabelLoader: browserlist => {
    return {
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            ['@babel/preset-env', {
              debug: true,
              modules: false,
              useBuiltIns: 'entry',
              targets: {
                browsers: browserlist,
              },
            }],
          ]
        }
      }
    }
  },

  // plugins used in both modern and legacy configs
  commonPlugins: () => {
    //
  }
}
