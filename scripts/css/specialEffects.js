const { helpers: color } = require('./color.js')

module.exports = {
	name: 'Special effects',
	utilities: `
		.shadow {
			box-shadow: 0 0 0.5rem ${color.getHSLValue('shadow')};
			box-shadow: 0 0 0.5rem var(--color-shadow);
		}
	`
}
