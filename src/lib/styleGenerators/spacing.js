const { spacing, breakpoints } = require('../design-tokens.js')
const { helpers: scale } = require('./scale.js')


function get (name = 'medium', {
	unit = 'rem',
	split = false
} = {}) {
	if (split) {
		const size = scale.get(spacing.scale[name], { unit: false })
		return `${size / 2}${unit}`
	}
	return scale.get(spacing.scale[name], { unit })
}

module.exports = {
	name: 'Spacing',
	helpers: { get },
	customProperties: Object.keys(spacing.scale).map(name => `
		--space-${name}: ${get(name)};
	`),
	utilities: `
		${['padding', 'margin'].map(prop => `
			/* ${prop} */

			/* all sides */
			.${prop} {
				${prop}: ${get()};
			}

			.no-${prop} {
				${prop}: 0 !important;
			}

			/* vertical and horizontal spacing */
			.${prop}-x {
				${prop}-left: ${get()};
				${prop}-right: ${get()};
			}

			.${prop}-y {
				${prop}-top: ${get()};
				${prop}-bottom: ${get()};
			}

			.${prop}-x-flow > * + * {
				${prop}-left: ${get()};
			}

			.${prop}-y-flow > * + * {
				${prop}-top: ${get()};
			}

			/* size variations */
			${Object.keys(spacing.scale).map(size => `
				.${prop}-${size} {
					${prop}: ${get(size)};
				}

				.${prop}-x-${size} {
					${prop}-left: ${get(size)};
					${prop}-right: ${get(size)};
				}

				.${prop}-y-${size} {
					${prop}-top: ${get(size)};
					${prop}-bottom: ${get(size)};
				}

				.${prop}-x-flow-${size} > * + * {
					${prop}-left: ${get(size)};
				}

				.${prop}-y-flow-${size} > * + * {
					${prop}-top: ${get(size)};
				}
			`)}

			/* sides */
			${['left', 'right', 'top', 'bottom'].map(side => `
				.${prop}-${side} {
					${prop}-${side}: ${get()};
				}

				.no-${prop}-${side} {
					${prop}-${side}: 0 !important;
				}

				${Object.keys(spacing.scale).map(size => `
					.${prop}-${side}-${size} {
						${prop}-${side}: ${get(size)};
					}
				`).join('')}
			`).join('')}
		`).join('')}

		/* outside spacing */
		.padding-x-outside {
			padding-left: ${get(spacing.outside.default)};
			padding-right: ${get(spacing.outside.default)};
		}

		.margin-x-auto {
			margin-left: auto;
			margin-right: auto;
		}

		${Object.keys(spacing.outside)
			.filter(breakpoint => breakpoint !== 'default')
			.map(breakpoint => `
				@media screen and (min-width: ${breakpoints.sizes[breakpoint]}${breakpoints.unit}) {
					.padding-x-outside {
						padding-left: ${get(spacing.outside[breakpoint])};
						padding-right: ${get(spacing.outside[breakpoint])};
					}
				}
			`)
			.join('')
		}

		/*
			split gutters
			-> add uniform gutters to a group of elements
		*/

		.gutter-wrapper {
		  padding: ${get('medium', { split: true })};
		  margin: -${get('medium')};
		}

	  .gutter-wrapper .gutter {
	    padding: ${get('medium', { split: true })};
	  }

		${Object.keys(spacing.scale)
			.filter(size => size !== 'medium')
			.map(size => `
				.gutter-wrapper.${size} {
				  padding: ${get(size, { split: true })};
				  margin: -${get(size)};
				}

			  .gutter-wrapper.${size} .gutter {
			    padding: ${get(size, { split: true })};
			  }
			`)
			.join('')
		}
	`
}
