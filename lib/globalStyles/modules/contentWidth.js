import { contentWidths as widths } from '../design-tokens.js';

const name = 'Content width';

// custom properties
const customProperties = Object.keys(widths).map((width) => `
	--content-width-${width}: ${widths[width]}rem;
`);

// css output
export { name, customProperties };
