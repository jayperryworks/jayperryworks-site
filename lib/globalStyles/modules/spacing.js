import { spacing, breakpoints } from '../design-tokens.js';
import scale from './scale.js';

const name = 'Spacing';

const props = ['padding', 'margin'];

// --- helpers ---
function get(sizeName = 'medium', options = {}) {
	const {
		unit = 'rem',
		split = false,
	} = options;

	if (split) {
		const size = scale.get(spacing.scale[sizeName], { unit: false });
		return `${size / 2}${unit}`;
	}
	return scale.get(spacing.scale[sizeName], { unit });
}

// --- custom properties ---
const customProperties = [
	...Object.keys(spacing.scale).map((sizeName) => `
		--space-${sizeName}: ${get(sizeName)};
	`),
];

// --- base styles ---
// -> additional custom properties for responsive outside margins
const base = Object.keys(spacing.outside).reduce((result, breakpoint) => {
	if (breakpoint === 'default') {
		result.push(`
			:root {
				--space-outside: var(--space-${spacing.outside[breakpoint]});
			}
		`);
		return result;
	}

	result.push(`
		@media screen and (min-width: ${breakpoints.sizes[breakpoint]}${breakpoints.unit}) {
			:root {
				--space-outside: var(--space-${spacing.outside[breakpoint]});
			}
		}
	`);
	return result;
}, []);

// --- utilities ---
const utilityClasses = {};

// all sides
utilityClasses.basics = props.map((prop) => `
	/* ${prop} */

	/* all sides */
	.${prop} {
		${prop}: ${get()};
	}

	.no-${prop} {
		${prop}: 0 !important;
	}
`).join('\n');

// vertical and horizontal spacing
utilityClasses.axes = props.map((prop) => `
	/* ${prop} */

	.${prop}-x {
		${prop}-left: ${get()};
		${prop}-right: ${get()};
	}

	.${prop}-y {
		${prop}-top: ${get()};
		${prop}-bottom: ${get()};
	}

	.${prop}-x-flow > * + * {
		${prop}-left: ${get()};
	}

	.${prop}-y-flow > * + * {
		${prop}-top: ${get()};
	}
`).join('\n');

// sizing variations
/* eslint-disable arrow-body-style */
// -> using a return block here for readability/line width
utilityClasses.sizes = props.map((prop) => {
	return Object.keys(spacing.scale).map((size) => `
		/* ${prop} */

		.${prop}-${size} {
			${prop}: ${get(size)};
		}

		.${prop}-x-${size} {
			${prop}-left: ${get(size)};
			${prop}-right: ${get(size)};
		}

		.${prop}-y-${size} {
			${prop}-top: ${get(size)};
			${prop}-bottom: ${get(size)};
		}

		.${prop}-x-flow-${size} > * + * {
			${prop}-left: ${get(size)};
		}

		.${prop}-y-flow-${size} > * + * {
			${prop}-top: ${get(size)};
		}
	`).join('');
}).join('');
/* eslint-enable arrow-body-style */

// sides
/* eslint-disable arrow-body-style */
// -> using a return block here for readability/line width
utilityClasses.sides = props.map((prop) => {
	return ['left', 'right', 'top', 'bottom'].map((side) => `
		/* ${prop} */

		.${prop}-${side} {
			${prop}-${side}: ${get()};
		}

		.no-${prop}-${side} {
			${prop}-${side}: 0 !important;
		}

		${Object.keys(spacing.scale).map((size) => `
			.${prop}-${side}-${size} {
				${prop}-${side}: ${get(size)};
			}
		`).join('')}
	`).join('');
}).join('\n');
/* eslint-enable arrow-body-style */

// outside spacing
utilityClasses.outside = `
	.padding-x-outside {
		padding-left: ${get(spacing.outside.default)};
		padding-right: ${get(spacing.outside.default)};
	}

	.margin-x-auto {
		margin-left: auto;
		margin-right: auto;
	}

	${Object.keys(spacing.outside)
	.filter((breakpoint) => breakpoint !== 'default')
	.map((breakpoint) => `
		@media screen and (min-width: ${breakpoints.sizes[breakpoint]}${breakpoints.unit}) {
			.padding-x-outside {
				padding-left: ${get(spacing.outside[breakpoint])};
				padding-right: ${get(spacing.outside[breakpoint])};
			}
		}
	`)
	.join('')}
`;

// split gutters
// 	-> add uniform gutters to a group of elements
utilityClasses.gutters = `
	.gutter-wrapper {
		padding: ${get('medium', { split: true })};
		margin: -${get('medium')};
	}

	.gutter-wrapper .gutter {
		padding: ${get('medium', { split: true })};
	}

	${Object.keys(spacing.scale)
	.filter((size) => size !== 'medium')
	.map((size) => `
		.gutter-wrapper.${size} {
			padding: ${get(size, { split: true })};
			margin: -${get(size)};
		}

		.gutter-wrapper.${size} .gutter {
			padding: ${get(size, { split: true })};
		}
	`)
	.join('')}
`;

const utilities = Object.values(utilityClasses).join('');

// css output
export {
	name,
	customProperties,
	base,
	utilities,
};

// js helpers
export default { get };
