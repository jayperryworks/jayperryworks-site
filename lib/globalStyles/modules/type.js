import { type } from '../design-tokens.js';
import color from './color.js';
import bp from './breakpoints.js';
import scale from './scale.js';

const name = 'Type';

// --- helpers ---
function webfont(fontName, filename, {
	formats = ['woff', 'ttf'],
	weight = 'normal',
	style = 'normal',
}) {
	return `
		@font-face {
		  font-display: swap;
		  font-family: '${fontName}';
		  font-style: ${style};
		  font-weight: ${weight};
		  src: ${formats.map((format) => `
		  	url('${filename}.${format}') format('${format}')
	  	`).join(', ')};
		}
	`;
}

function font(role) {
	const token = type.fonts.find((item) => item.role === role);

	return `'${token.name}', ${token.stack};`;
}

function middleSize(minScale, maxScale) {
	const minSize = scale.get(minScale, { unit: false });
	const maxSize = scale.get(maxScale, { unit: false });
	return ((minSize + maxSize) / 2).toFixed(2);
}

function fluidScale(minSize, maxSize, fluidTarget = 2) {
	return `
		clamp(
			${scale.get(minSize)},
			calc(1rem + ${fluidTarget}vw),
			${scale.get(maxSize)}
		);
	`;
}

function fontSize(size) {
	const { base, fluid, max } = type.scale[size];

	if (max) {
		return `
			font-size: ${middleSize(base, max)}rem;
			font-size: ${fluidScale(base, max, fluid)};
		`;
	}
	return `font-size: ${scale.get(base)};`;
}

function heading(selectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
	return `
		${selectors} {
			font-family: ${font('display')};
			font-weight: normal;
			display: block;
			line-height: ${type.leading.tight};
			margin: 0;
			max-width: none; /* reset default width of p elements */
		}

		${selectors.map((selector) => `${selector} a`)} {
			border-bottom: none;
			color: inherit;
		}

		${selectors.map((selector) => `
			${selector} a:hover,
			${selector} a:active
		`)} {
			${color.add('color', 'highlight')}
		}

		${selectors.map((selector) => `${selector} strong`)} {
			font-weight: normal;
		}

		${selectors.map((selector) => `${selector} em`)} {
			font-style: normal;
		}
	`;
}

// --- custom properties ---
const customProperties = [
	...Object.keys(type.scale).map((size) => {
		const { base, max, fluid } = type.scale[size];
		return `
			--type-scale-${size}: ${max
				? fluidScale(base, max, fluid)
				: scale.get(base)
			};
		`;
	}),
	...type.fonts.map((f) => `--type-font-${f.role}: ${font(f.role)};`),
	...Object.keys(type.leading).map((l) => `--type-leading-${l}: ${type.leading[l]};`),
];

const webfonts = type.fonts.reduce((result, token) => {
	/* eslint-disable no-shadow */
	// -> the 'name' declaration is a value destructured from the token object
	const { name, formats, variants } = token;
	if (formats && variants) {
		const fontFace = variants.map((variant) => webfont(
			name,
			variant.file,
			{ formats, ...variant },
		)).join('');
		result.push(fontFace);
	}
	return result;
	/* eslint-enable no-shadow */
}, []).join('');

const responsiveScaling = type.screenScale.map(({ screen, size }) => {
	const css = `
			html {
				font-size: ${size}%;
			}
		`;
	if (screen === 'default') return css;
	return bp.query(screen, css);
}).join('');

// --- base styles ---
const base = `
	/* webfonts */
	${webfonts}

	/* global type */
	${responsiveScaling}

	body {
		${fontSize('epsilon')};
		font-family: ${font('body')};
		line-height: ${type.leading.default};
	}

	${heading()}

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
		border-bottom: 0.125em solid var(--color-highlight);
		color: inherit;
		text-decoration: none;
		transition: color 0.25s ease;
		will-change: color;
	}

	a:hover,
	a:active {
		color: var(--color-highlight);
	}

	strong {
		font-weight: bold;
	}

	em {
		font-style: italic;
	}
`;

const utilities = `
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

	.type-scale-alpha,
	.type-scale-beta {
		line-height: ${type.leading.xtight};
	}

	/* leading */
	${Object.keys(type.leading).map((size) => `
		.type-leading-${size} {
			line-height: ${type.leading[size]};
		}
	`).join('')}

	/* case */
	.type-case-upper {
		text-transform: uppercase;
	}

	/* alignment */
	${['center', 'right', 'left'].map((side) => `
		.type-align-${side} {
			text-align: ${side};
		}
	`).join('')}
`;

// css output
export {
	name,
	customProperties,
	base,
	utilities,
};

// js helpers
export default {
	font,
	fontSize,
};
