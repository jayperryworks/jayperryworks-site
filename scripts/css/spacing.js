const { spacing, breakpoints } = require('../../content/design-tokens.js')

function value (name = 'medium') {
	return `${spacing.scale[name]}rem`
}

module.exports = {
	name: 'Spacing',
	customProperties: Object.keys(spacing.scale).map(name => `
		--space-${name}: ${value(name)};
	`),
	utilities: `		
		${['padding', 'margin'].map(prop => `
			/* ${prop} */

			/* all sides */
			.${prop} {
				${prop}: ${value()};
			}

			.no-${prop} {
				${prop}: 0 !important;
			}

			/* vertical and horizontal spacing */
			.${prop}-x {
				${prop}-left: ${value()};
				${prop}-right: ${value()};
			}

			.${prop}-y {
				${prop}-top: ${value()};
				${prop}-bottom: ${value()};
			}

			.${prop}-x-flow > * + * {
				${prop}-left: ${value()};
			}

			.${prop}-y-flow > * + * {
				${prop}-top: ${value()};
			}

			/* size variations */
			${Object.keys(spacing.scale).map(size => `
				.${prop}-${size} {
					${prop}: ${value(size)};
				}

				.${prop}-x-${size} {
					${prop}-left: ${value(size)};
					${prop}-right: ${value(size)};
				}

				.${prop}-y-${size} {
					${prop}-top: ${value(size)};
					${prop}-bottom: ${value(size)};
				}

				.${prop}-x-flow-${size} > * + * {
					${prop}-left: ${value(size)};
				}

				.${prop}-y-flow-${size} > * + * {
					${prop}-top: ${value(size)};
				}
			`)}

			/* sides */
			${['left', 'right', 'top', 'bottom'].map(side => `
				.${prop}-${side} {
					${prop}-${side}: ${value()};
				}

				.no-${prop}-${side} {
					${prop}-${side}: 0 !important;
				}

				${Object.keys(spacing.scale).map(size => `
					.${prop}-${side}-${size} {
						${prop}-${side}: ${value(size)};
					}
				`).join('')}
			`).join('')}
		`).join('')}

		/* outside spacing */
		.padding-x-outside {
			padding-left: ${value(spacing.outside.default)};
			padding-right: ${value(spacing.outside.default)};
		}

		${Object.keys(spacing.outside)
			.filter(breakpoint => breakpoint !== 'default')
			.map(breakpoint => `
				@media screen and (min-size: ${breakpoints.sizes[breakpoint]}${breakpoints.unit}) {
					.padding-x-outside {
						padding-left: ${value(spacing.outside[breakpoint])};
						padding-right: ${value(spacing.outside[breakpoint])};
					}
				}
			`)
			.join('')
		}
	`
}
