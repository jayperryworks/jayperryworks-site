const modularscale = require('modularscale-js')
const { scale: ratio } = require('../../content/design-tokens.js')

function get (value, { 
	unit = 'rem',
	base = 1,
	decimal = 2
} = {}) {
	let number = modularscale(value, { base, ratio })

	if (decimal && decimal > 0) {
		// need to do some math to round the number to the given number of decimal places without converting it to a string
		// .toFixed() does this more simply but it outputs a string
		// -> https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/
		const divisor = Math.pow(10, decimal)
		number = Math.round(number * divisor) / divisor
	}

	if (unit) {
  	return String(number).concat(unit)
	}

	return number
}

// base scale
// -> config object for modularscale library
module.exports = {
	name: 'Scale',
  helpers: {
	  get
	},
	customProperties: [
		`--scale-ratio: ${ratio};`
	]
}