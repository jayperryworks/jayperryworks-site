const { breakpoints } = require('../../content/design-tokens.js')

function query (size, content, direction = '>') {
	const size = direction === '>'
		? `${breakpoints.sizes[size]}${breakpoints.unit}`
		: `${breakpoints.sizes[size] - 0.01}${breakpoints.unit}`

	return `
		@media screen and (max-width: ${size}) {
			${content}
		}
	`
}

function responsiveClasses (className, block, direction = '>') {
	if (direction === '<') {
		return Object.keys(breakpoints.sizes).map(bp => `
			@media screen and (max-width: ${breakpoints.sizes[bp] - 0.01}${breakpoints.unit}) {
				.${bp}\\:${className} {
					${block}
				}
			}
		`).join('')
	}

	return Object.keys(breakpoints.sizes).map(bp => `
		@media screen and (min-width: ${breakpoints.sizes[bp]}${breakpoints.unit}) {
			.${bp}\\:${className} {
				${block}
			}
		}
	`).join('')
}

module.exports = {
	name: 'Breakpoints',
	helpers: { query, responsiveClasses },
	customProperties: Object.keys(breakpoints.sizes).map(bp => `
		--breakpoint-${bp}: ${breakpoints.sizes[bp]}${breakpoints.unit};
	`)
}