const widths = {
	narrow: 30,
	default: 40,
	wide: 64,
	xwide: 75,
	xxwide: 112
}

module.exports = {
	name: 'Content Width',
	customProperties: Object.keys(widths).map((width) => {
		return `--content-width-${width}: ${widths[width]}rem;`
	}),
	utilities: Object.keys(widths).map((width) => {
		if (width !== 'default') {
			return `
				.content-width-${width} {
					max-width: ${widths[width]}rem;
					max-width: var(--content-width-${width});
				}
			`
		}

		return `
			.content-width {
				max-width: ${widths.default}rem;
				max-width: var(--content-width-default);
			}
		`
	})
}