const { borders, type, spacing, breakpoints } = require('../../content/design-tokens.js')
const { helpers: theme } = require('./color.js')
const { helpers: spacingHelpers } = require('./spacing.js')

const borderSeamSelectors = {
	top: 'before',
	bottom: 'after'
}

function add ({
	side = 'all',
	color = 'border',
	style = 'dashed'
} = {}) {
	return `
		border${side === 'all' ? '' : `-${side}`}: ${borders.widths.default}px ${style} ${theme.getValue('border')};
		border${side === 'all' ? '' : `-${side}`}: ${borders.widths.default}px ${style} ${theme.getCustomProperty('border')};
	`
}

module.exports = {
	name: 'Borders',
	customProperties: [
		`--border-radius: ${borders.radius.size}${borders.radius.unit};`
	],
	helpers: {
		add
	},
	utilities: `
		.border {
			${add()}
		}

		.no-border {
			border: 0 !important;
		}

		/* variations */
		.border.solid {
			border-style: solid;
		}

		.border-round {
			border-radius: ${borders.radius.size}${borders.radius.unit};
		}

		${['top', 'right', 'bottom', 'left'].map(side => `
			.border-${side} {
				${add({ side })}
			}

			.no-border-${side} {
				border-${side}: 0 !important;
			}

			.border-${side}.solid {
				border-${side}-style: solid;
			}
		`).join('')}

		.border-y-flow > * + * {
			${add({ side: 'top' })}
		}

		.border-y-flow.solid > * + * {
			border-top-style: solid;
		}

		.border-x-flow > * + * {
			${add({ side: 'left' })}
		}

		.border-x-flow.solid > * + * {
			border-left-style: solid;
		}

		/* 
			"Seam" effect border
			-> use an svg pattern to create a styled border that looks like stitching
		*/
		${Object.keys(borderSeamSelectors).map(side => `
			.border-seam-${side} {
				${add({ side })}
				position: relative;
			}

			@supports(
				border-image:
					url('whatever.svg')
					${borders.seam.marker.h} 0 0 ${borders.seam.marker.w}
					repeat
			) {
				.border-seam-${side} {
					border-${side}: none;
				}

				.border-seam-${side}::${borderSeamSelectors[side]} {
					${side}: -${borders.seam.marker.h / 2}px;
					border-image:
					  url('${borders.seam.image}')
					  ${borders.seam.marker.h} 0 0 ${borders.seam.marker.w}
					  repeat;
					border-style: solid;
					border-width: ${borders.seam.marker.h}px 0 0 10px;
					content: '';
					display: block;
					height: 0;
					left: -${borders.seam.marker.w}px;
					position: absolute;
					right: ${spacingHelpers.get(spacing.outside.default)};
					z-index: 3;
				}

				${Object.keys(spacing.outside).map(screen => `
					@media screen and (max-width: ${breakpoints.sizes[screen]}${breakpoints.unit}) {
						.border-seam-${side}::${borderSeamSelectors[side]} {
							right: ${spacingHelpers.get(spacing.outside[screen])};
						}
					}
				`).join('')}
			}
		`).join('')}
	`
}