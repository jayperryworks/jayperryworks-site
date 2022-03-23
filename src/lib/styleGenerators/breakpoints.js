const { breakpoints } = require('../design-tokens.js')

function query (size, content, direction = '>') {
	if (!breakpoints.sizes[size]) {
		throw `Error: screen size '${size}' doesn't exist in the design tokens.`
	}

	const screen = direction === '>'
		? `${breakpoints.sizes[size]}${breakpoints.unit}`
		: `${breakpoints.sizes[size] - 0.01}${breakpoints.unit}`

	const prop = direction === '>' ? 'min' : 'max'

	return `
		@media screen and (${prop}-width: ${screen}) {
			${content}
		}
	`
}

function responsiveClasses (className, block, direction = '>') {
	return Object.keys(breakpoints.sizes).map((bp) => {
		const css = `
			.${bp}\\:${className} {
				${block}
			}
		`
		return query(bp, css, direction)
	}).join('')
}

module.exports = {
	name: 'Breakpoints',
	helpers: { query, responsiveClasses },
	customProperties: Object.keys(breakpoints.sizes).map(bp => `
		--breakpoint-${bp}: ${breakpoints.sizes[bp]}${breakpoints.unit};
	`)
}
