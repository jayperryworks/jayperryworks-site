const { breakpoints } = require('../../content/design-tokens.js')

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
	helpers: { responsiveClasses },
	customProperties: Object.keys(breakpoints.sizes).map(bp => `
		--breakpoint-${bp}: ${breakpoints.sizes[bp]}${breakpoints.unit};
	`)
}