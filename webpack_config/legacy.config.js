// 'Legacy' configuration for older browsers that only support ES5

const base = require('./base.config.js')
const path = require('path')

module.exports = Object.assign({}, base.config, {
  output: {
    filename: '[name].es5.js',
    path: base.outputPath
  },
  module: {
    rules: [
      base.configureBabelLoader([
        '> 1%',
        'last 2 versions',
        'Firefox ESR'
      ])
    ]
  },
  // plugins: base.commonPlugins()
})
