import color from './color.js';

const name = 'Special effects';

const utilities = `
	.shadow {
		box-shadow: 0 0 0.5rem ${color.getHSLValue('shadow')};
		box-shadow: 0 0 0.5rem var(--color-shadow);
	}
`;

// css output
export { name, utilities };
