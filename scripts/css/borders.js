const { type } = require('../../content/design-tokens.js')
const { helpers: theme } = require('./color.js')

function add ({
	side = 'all',
	width = 'thin',
	color = 'border',
	style = 'dashed'
} = {}) {
	return `
		border${side === 'all' ? '' : `-${side}`}: 1px dashed ${theme.getValue('border')};
		border${side === 'all' ? '' : `-${side}`}: 1px dashed var(--color-${color});
	`
}

module.exports = {
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
			border-radius: 0.2rem;
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
	`
}