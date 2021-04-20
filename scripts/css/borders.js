const { type } = require('../../content/design-tokens.js')
const { helpers: theme } = require('./color.js')

const radius = 0.2

function add ({
	side = 'all',
	color = 'border',
	style = 'dashed'
} = {}) {
	return `
		border${side === 'all' ? '' : `-${side}`}: 1px dashed ${theme.getValue('border')};
		border${side === 'all' ? '' : `-${side}`}: 1px dashed var(--color-${color});
	`
}

module.exports = {
	name: 'Borders',
	customProperties: [
		`--border-radius: ${radius}em;`
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
			border-radius: ${radius}em;
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
		`)}

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
	`
}