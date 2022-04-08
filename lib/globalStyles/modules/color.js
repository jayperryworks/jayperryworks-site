import { color } from '../design-tokens.js';

const name = 'Color';

// helpers
function hsl(colorToken) {
	if (colorToken?.a < 1) {
		return `hsl(${colorToken.h}, ${colorToken.s}%, ${colorToken.l}%, ${colorToken.a})`;
	}
	return `hsl(${colorToken.h}, ${colorToken.s}%, ${colorToken.l}%)`;
}

function getValue(role, theme = 'default') {
	return color.themes[theme][role];
}

function getHSLValue(role, theme = 'default') {
	return hsl(color.themes[theme][role]);
}

function getCustomProperty(role) {
	return `var(--color-${role});`;
}

function setCustomProperty(role, {
	h,
	s,
	l,
	a,
}) {
	return `
		--color-${role}-h: ${h};
		--color-${role}-s: ${s}%;
		--color-${role}-l: ${l}%;
		${a ? `--color-${role}-a: ${a};` : ''}

		--color-${role}: hsl(
			var(--color-${role}-h),
			var(--color-${role}-s),
			var(--color-${role}-l)
			${a ? `, ${a}` : ''}
		);
	`;
}

function listCustomProperties(theme) {
	/* eslint-disable arrow-body-style */
	// -> using a return block for readability/line-width
	return Object.keys(color.themes[theme]).map((role) => {
		return setCustomProperty(role, color.themes[theme][role]);
	});
	/* eslint-enable arrow-body-style */
}

function add(prop, role) {
	return `
		${prop}: ${hsl(color.themes.default[role])};
		${prop}: ${getCustomProperty(role)};
	`;
}

// custom properties
const customProperties = listCustomProperties('default');

// base
const base = `
	/* to be implemented later
		@media screen and (prefers-color-scheme: dark) {
			body {
				${listCustomProperties('dark').join('\n')}
			}
		}
	*/

	body {
		${add('color', 'primary')}
		${add('background-color', 'bg')}
	}
`;

// utilities
const utilities = Object.keys(color.themes.default)
	.filter((roleName) => roleName !== 'shadow')
	.map((roleName) => `
			.color-fg-${roleName} {
				${add('color', roleName)}
			}

			.color-bg-${roleName} {
				${add('background-color', roleName)}
			}
		`)
	.join('\n');

// css output
export {
	name,
	customProperties,
	base,
	utilities,
};

// js helpers
export default {
	getValue,
	getHSLValue,
	getCustomProperty,
	setCustomProperty,
	add,
};
