const { borders, type, spacing, breakpoints } = require('../design-tokens.js');
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
			return `--border-spine-width${propSuffix}: ${values.width}${values.unit};`;
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
			"Spine" border effect
			-> a stripe on the left side of the layout, a la a book spine, that also displays loading status
		*/
		.border-spine {
			--spine-color: ${theme.getHSLValue('border')};
			--spine-color: var(--color-highlight);

			--spine-color-tint: hsl(
				var(--color-highlight-h),
				var(--color-highlight-s),
				calc(var(--color-highlight-l) + 10%)
			);
			--spine-stripe-size: 30px;

			padding-left: var(--border-spine-width);
			position: relative;
		}

		.border-spine::before {
			background-color: var(--spine-color);
			bottom: 0;
			content: '';
			display: block;
			left: 0;
			position: fixed;
			top: 0;
			width: var(--border-spine-width);
			z-index: 0;
		}

		@keyframes stripes {
			from { background-position: 0 0; }
			to   { background-position: var(--spine-stripe-size) var(--spine-stripe-size); }
		}

		@supports (background: repeating-linear-gradient(45deg, #fff, #000)) {
			.border-spine.loading::before {
				/* cheers to https://css-tricks.com/uniqlo-stripe-hovers/ */
				animation: stripes 0.75s linear infinite;
				background: repeating-linear-gradient(
					-45deg,
					var(--spine-color),
					var(--spine-color) 25%,
					var(--spine-color-tint) 25%,
					var(--spine-color-tint) 50%,
					var(--spine-color) 50%
				) top left fixed;
				background-size: var(--spine-stripe-size) var(--spine-stripe-size);
			}
		}

		${Object.keys(borders.spine).filter(s => s !== 'default').map((size) => {
			return `
				@media screen and (min-width: ${breakpoints.sizes[size]}${breakpoints.unit}) {
					.border-spine {
						padding-left: var(--border-spine-width-${size});
					}
					.border-spine::before {
						width: var(--border-spine-width-${size});
					}
				}
			`;
		}).join('')}

		/*
			"Seam" border effect
			-> use a pseudo-element to create a border that overlays the "spine" and suggests stitching
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
				left: calc(var(--border-spine-width) * -1);
				position: absolute;
				width: ${borders.spine.default.width}${borders.spine.default.unit};
				width: var(--border-spine-width);
				z-index: 3;
			}

			${Object.keys(borders.spine).filter(s => s !== 'default').map((size) => {
				return `
					@media screen and (min-width: ${breakpoints.sizes[size]}${breakpoints.unit}) {
						.border-seam-${side}::${borderSeamSelectors[side]} {
							left: calc(var(--border-spine-width-${size}) * -1);
							width: var(--border-spine-width-${size});
						}
					}
				`;
			}).join('')}
		`).join('')}
	`
}
