const { type } = require('../../content/design-tokens.js')
const { helpers: color } = require('./color.js')
const { helpers: border } = require('./borders.js')
const { helpers: breakpoints } = require('./breakpoints.js')
const { helpers: scale } = require('./scale.js')

function webfont (name, filename, {
	formats = ['woff', 'ttf'],
	weight = 'normal',
	style = 'normal'
} = {}) {
	return `
		@font-face {
		  font-display: swap;
		  font-family: '${name}';
		  font-style: ${style};
		  font-weight: ${weight};
		  src: ${formats.map(format => `
		  	url('${filename}.${format}') format('${format}')
	  	`).join(', ')};
		}
	`
}

function font (role) {
	const font = type.fonts.find((font) => font.role === role)

	return `'${font.name}', ${font.stack};`
}

function middleSize (minSize, maxSize) {
	minSize = scale.get(minSize, { unit: false })
	maxSize = scale.get(maxSize, { unit: false })
	return ((minSize + maxSize) / 2).toFixed(2)
}

function fluidScale (minSize, maxSize, fluidTarget = 2) {
	return `
		clamp(
			${scale.get(minSize)},
			calc(1rem + ${fluidTarget}vw),
			${scale.get(maxSize)}
		);
	`
}

function fontSize (size) {
	const { base, fluid, max } = type.scale[size]

	if (max) {
		return `
			font-size: ${middleSize(base, max)}rem;
			font-size: ${fluidScale(base, max, fluid)};
		`
	}
	return `font-size: ${scale.get(base)};`
}

const heading = `
	${color.add('color', 'primary')}
	font-family: ${font('display')};
	display: block;
	line-height: ${type.leading.tight};
	margin: 0;
`

module.exports = {
	name: 'Type',
	customProperties: [
		...Object.keys(type.scale).map((size) => {
			const { base, max, fluid } = type.scale[size]
			return `
				--type-scale-${size}: ${max 
					? fluidScale(base, max, fluid)
					: scale.get(base)
				};
			`
		}),
		...type.fonts.map(f => `--type-font-${f.role}: ${font(f.role)};`)
	],
	helpers: {
		font,
		fontSize
	},
	base: `
		/* webfonts */
		${type.fonts.map((font) => {
			const { name, file, formats } = font
			return font.variants.map(variant => webfont(name, file, { formats, ...variant })).join('')
		}, []).join('')}

		/* global type */
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			${heading}
		}

		${Object.keys(type.scale).map((size, index) => `
			h${index + 1} {
				${fontSize(size)}
			}
		`).join('')}

		p {
			color: inherit;
			margin-bottom: 0;
			margin-top: 0;
			max-width: ${type.lineMeasure};
		}

		a {
			${border.add('bottom')}
			transition: all 0.25s ease;
			border-color: inherit;
			color: inherit;
			text-decoration: none;
		}

		strong {
			font-weight: bold;
		}

		em {
			font-style: italic;
		}
	`,
	utilities: `
		.type-heading {
			${heading}
		}

		.type-heading strong,
		.type-heading .type-weight-bold,
		.type-heading.type-weight-bold {
			font-weight: normal;
		}

		.type-heading em,
		.type-heading .type-style-italic,
		.type-heading.type-style-italic {
			font-style: normal;
		}

		${type.fonts.map(({ role }) => `
			.type-font-${role} {
				font: ${font(role)}
			}
		`)}

		.type-weight-bold {
			font-weight: bold;
		}

		.type-style-italic {
			font-style: italic;
		}

		.type-link-undecorated {
			border-bottom: none;
		}

		.type-link-undecorated::hover,
		.type-link-undecorated::active {
			border-bottom: none;
		}

		/* scale */
		${Object.keys(type.scale).map((size) => `
			.type-scale-${size} {
				${fontSize(size)}
			}
		`).join('')}

		/* leading */
		${Object.keys(type.leading).map(size => `
			.type-leading-${size} {
				line-height: ${type.leading[size]};
			}
		`).join('')}

		/* case */
		.type-case-upper {
			text-transform: uppercase;
		}

		/* alignment */
		${['left', 'middle', 'right'].map((side) => {
			return breakpoints.responsiveClasses(
				`type-align-${side}`,
				`text-align: ${side};`
			)
		}).join('')}
	`
}