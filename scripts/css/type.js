const { type, breakpoints } = require('../../content/design-tokens.js')
const { helpers: color } = require('./color.js')
const { helpers: border } = require('./borders.js')

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

function font (role, {
	style = 'normal',
	weight = 'regular'
} = {}) {
	const font = type.fonts.find((font) => {
		return font.role === role && font.weight === weight && font.style === style
	})

	return `
		font-family: ${font.name}, ${font.stack};
		${font.weight !== 'regular' ? `font-weight: ${font.weight};` : ''}
		${font.style !== 'normal' ? `font-style: ${font.style};` : ''}
	`
}

function fluidScale (selector, minSize, maxSize, {
	unit = 'rem'
} = {}) {
	minSize = parseFloat(minSize)
	maxSize = parseFloat(maxSize)

	return `
		${selector} {
			font-size: ${((minSize + maxSize) / 2).toFixed(2)}${unit};
		}

		@supports (font-size: clamp(${minSize}${unit}, 100vw, ${minSize}${unit})) {
			font-size: clamp(${minSize}${unit}, 100vw, ${maxSize}${unit});
		}
	`
}

const heading = `
	${color.add('color', 'primary')}
	${font('display')}
	display: block;
	line-height: ${type.leading.default};
	margin: 0;
`

module.exports = {
	name: 'Type',
	helpers: {
		font
	},
	base: `
		/* webfonts */
		${type.fonts.map(font => webfont(font.name, font.file, { ...font })).join('')}

		/* global type */
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			${heading}
		}

		p {
			color: inherit;
			margin-bottom: 0;
			margin-top: 0;
		}

		a {
			${border.add('bottom')}
			transition: all 0.25s ease;
			border-color: inherit;
			color: inherit;
			text-decoration: none;
		}
	`,
	utilities: `
		.type-heading {
			${heading}
		}

		.type-heading strong {
			font-family: inherit;
			font-style: normal;
		}

		.type-link-undecorated {
			border-bottom: none;
		}

		.type-link-undecorated::hover,
		.type-link-undecorated::active {
			border-bottom: none;
		}

		/* scale */
		${Object.keys(type.scale).map((size, index) => {
			if (Array.isArray(type.scale[size])) {
				return fluidScale(`
					h${index + 1},
					.type-scale-${size}
				`, type.scale[size][0], type.scale[size][1])
			}
			return `
				h${index + 1},
				.type-scale-${size} {
					font-size: ${Number.parseFloat(type.scale[size]).toFixed(2)}rem;
				}
			`
		}).join('')}

		/* leading */
		${Object.keys(type.leading).map(size => `
			.type-leading-${size} {
				line-height: ${type.leading[size]};
			}
		`).join('')}
	`
}