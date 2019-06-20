// 'Modern' configuration for browsers that support ES2015+ modules
// -> note: server must attach correct Content-Type 'text/javascript' headers to *.mjs files

const base = require('./base.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = Object.assign({}, base.config, {
  output: {
    filename: '[name].js',
    path: base.outputPath
  },
  module: {
    rules: [
      base.configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">.
        'last 2 Chrome versions', 'not Chrome < 60',
        'last 2 Safari versions', 'not Safari < 10.1',
        'last 2 iOS versions', 'not iOS < 10.3',
        'last 2 Firefox versions', 'not Firefox < 54',
        'last 2 Edge versions', 'not Edge < 15'
      ])
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
    // base.commonPlugins()
  ]
})
