const name = 'Content width';

// helpers
const widths = {
	narrow: 30,
	default: 40,
	wide: 64,
	xwide: 75,
	xxwide: 112,
};

// custom properties
const customProperties = Object.keys(widths).map((width) => `
	--content-width-${width}: ${widths[width]}rem;
`);

// utilities
const utilities = Object.keys(widths).map((width) => {
	if (width !== 'default') {
		return `
			.content-width-${width} {
				max-width: ${widths[width]}rem;
				max-width: var(--content-width-${width});
			}
		`;
	}

	return `
		.content-width {
			max-width: ${widths.default}rem;
			max-width: var(--content-width-default);
		}
	`;
}).join('\n');

// css output
export { name, customProperties, utilities };

// js helpers
export default { widths };
