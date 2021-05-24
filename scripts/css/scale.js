const modularscale = require('modularscale-js')
const { scale: ratio } = require('../../content/design-tokens.js')

// base scale
// -> config object for modularscale library
module.exports = {
	name: 'Scale',
  helpers: {
	  get: (value, { unit = 'rem', base = 1 } = {}) => {
	  	if (!unit) {
	  		return modularscale(value, { base, ratio }).toFixed(2)
	  	}
	  	return modularscale(value, { base, ratio }).toFixed(2).concat(unit)
    }
	},
	customProperties: [
		`--scale-ratio: ${ratio};`
	]
}