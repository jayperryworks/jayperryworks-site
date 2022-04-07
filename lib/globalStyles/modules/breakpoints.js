import { breakpoints } from '../design-tokens.js';

const name = 'Breakpoints';

// helpers
function query(size, content, direction = '>') {
	if (!breakpoints.sizes[size]) {
		throw new Error(`Error: screen size '${size}' doesn't exist in the design tokens.`);
	}

	const screen = direction === '>'
		? `${breakpoints.sizes[size]}${breakpoints.unit}`
		: `${breakpoints.sizes[size] - 0.01}${breakpoints.unit}`;

	const prop = direction === '>' ? 'min' : 'max';

	return `
		@media screen and (${prop}-width: ${screen}) {
			${content}
		}
	`;
}

function responsiveClasses(className, block, direction = '>') {
	return Object.keys(breakpoints.sizes).map((bp) => {
		const css = `
			.${bp}\\:${className} {
				${block}
			}
		`;
		return query(bp, css, direction);
	}).join('');
}

// custom properties
const customProperties = Object.keys(breakpoints.sizes).map((bp) => `
	--breakpoint-${bp}: ${breakpoints.sizes[bp]}${breakpoints.unit};
`);

// style output
export { name, customProperties };

// js helpers
export default { query, responsiveClasses };
