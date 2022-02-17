const { type } = require('../../content/design-tokens.js')
const { helpers: color } = require('./color.js')
const { helpers: border } = require('./borders.js')
const { helpers: bp } = require('./breakpoints.js')
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

function heading (selectors) {
	return `
		${selectors} {
			font-family: ${font('display')};
			font-weight: normal;
			display: block;
			line-height: ${type.leading.tight};
			margin: 0;
			max-width: none; /* reset default width of p elements */
		}

		${selectors.map(selector => `${selector} a`)} {
			border-bottom: none;
			color: inherit;
		}

		${selectors.map(selector => `
			${selector} a:hover,
			${selector} a:active
		`)} {
			${color.add('color', 'highlight')}
		}

		${selectors.map(selector => `${selector} strong`)} {
			font-weight: normal;
		}

		${selectors.map(selector => `${selector} em`)} {
			font-style: normal;
		}
	`
}

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
			if (file) {
				return font.variants.map(variant => webfont(name, file, { formats, ...variant })).join('')
			}
		}, []).join('')}

		/* global type */
		${type.screenScale.map(({ screen, size }) => {
			const css = `
				html {
			    font-size: ${size}%;
			  }
			`
			if (screen === 'default') return css
			return bp.query(screen, css)
		}).join('')}

		body {
		  ${fontSize('epsilon')};
		  font-family: ${font('body')};
		  line-height: ${type.leading.default};
		}

		${heading([
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6'
		])}

		${Object.keys(type.scale).map((size, index) => `
			h${index + 1} {
				${fontSize(size)}
			}
		`).join('')}

		h1,
		h2 {
			line-height: ${type.leading.xtight};
		}

		p {
			margin-bottom: 0;
			margin-top: 0;
			max-width: ${type.lineMeasure}ch;
		}

		a {
			${border.add({ side: 'bottom' })};
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
		${heading(['.type-heading'])}

		/* same as a heading, but a different font and color */
		.type-subheading {
			${color.add('color', 'secondary')}
			font-family: ${font('accent')};
			font-weight: 200;
			display: block;
			line-height: ${type.leading.tight};
			margin: 0;
		}

		.type-scale-zeta.type-subheading {
			font-weight: 300;
		}

		.type-subheading a {
			border-bottom: none;
			color: inherit;
		}

		.type-subheading a:hover,
		.type-subheading a:active {
			${color.add('color', 'highlight')}
		}

		.type-subheading strong {
			font-weight: bold;
		}

		.type-subheading em {
			font-style: italic;
		}

		${type.fonts.map(({ role }) => `
			.type-font-${role} {
				font-family: ${font(role)};
			}
		`).join('')}

		.type-font-accent.type-weight-xlight,
		.type-font-accent .type-weight-xlight {
			font-weight: 200;
		}

		.type-font-accent.type-weight-light,
		.type-font-accent .type-weight-light {
			font-weight: 300;
		}

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

		/* zero out the type size to avoid whitespace bugs */
		.type-scale-zero {
			font-size: 0 !important;
		}

		.type-scale-alpha,
		.type-scale-beta {
			line-height: ${type.leading.xtight};
		}

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
		${['center', 'right', 'left'].map((side) => {
			return `
				.type-align-${side} {
					text-align: ${side};
				}
			`
		}).join('')}
	`
}
