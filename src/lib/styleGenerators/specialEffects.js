import { helpers as color } from './color.js';

export default {
	name: 'Special effects',
	utilities: `
		.shadow {
			box-shadow: 0 0 0.5rem ${color.getHSLValue('shadow')};
			box-shadow: 0 0 0.5rem var(--color-shadow);
		}
	`
}
