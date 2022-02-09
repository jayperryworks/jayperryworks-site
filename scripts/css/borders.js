const { borders, type, spacing, breakpoints } = require('../../content/design-tokens.js');
const { helpers: theme } = require('./color.js');
const { helpers: spacingHelpers } = require('./spacing.js');

const borderSeamSelectors = {
	top: 'before',
	bottom: 'after'
};

function add ({
	side = 'all',
	color = 'border',
	style = 'dashed'
} = {}) {
	const prop = `border${side === 'all' ? '' : `-${side}`}`;

	return `
		${prop}: ${borders.widths.default}px ${style} ${theme.getHSLValue('border')};
		${prop}: ${borders.widths.default}px ${style} ${theme.getCustomProperty('border')};
	`
}

module.exports = {
	name: 'Borders',
	customProperties: [
		`--border-radius: ${borders.radius.size}${borders.radius.unit};`,
		// spine custom props for each screen width
		...Object.keys(borders.spine).map((size) => {
			const values = borders.spine[size];
			const propSuffix = size !== 'default' ? `-${size}` : '';
			return `--spine-width${propSuffix}: ${values.width}${values.unit};`;
		})
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

			.border-seam-${side}::${borderSeamSelectors[side]} {
				${side}: -${borders.seam.marker.h / 2}${borders.seam.marker.unit};
				background-color: ${theme.getHSLValue('primary')};
				background-color: ${theme.getCustomProperty('primary')};
				content: '';
				display: block;
				height: ${borders.seam.marker.h}${borders.seam.marker.unit};
				left: -${borders.spine.default.width}${borders.spine.default.unit};
				left: calc(var(--spine-width) * -1);
				position: absolute;
				width: ${borders.spine.default.width}${borders.spine.default.unit};
				width: var(--spine-width);
				z-index: 3;
			}

			${Object.keys(borders.spine).filter(s => s !== 'default').map((size) => {
				return `
					@media screen and (min-width: ${breakpoints.sizes[size]}${breakpoints.unit}) {
						.border-seam-${side}::${borderSeamSelectors[side]} {
							left: calc(var(--spine-width-${size}) * -1);
							width: var(--spine-width-${size});
						}
					}
				`;
			}).join('')}
		`).join('')}
	`
}
