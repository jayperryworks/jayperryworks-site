import modularscale from 'modularscale-js';
import { scale as ratio } from '../design-tokens.js';

const name = 'Scale';

// helpers
function get(value, options = {}) {
	const {
		unit = 'rem',
		base = 1,
		decimal = 2,
	} = options;
	let number = modularscale(value, { base, ratio });

	if (decimal && decimal > 0) {
		// need to do some math to round the number to the given number of decimal places
		// without converting it to a string
		// .toFixed() does this more simply but it outputs a string
		// -> https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/
		const divisor = 10 ** decimal;
		number = Math.round(number * divisor) / divisor;
	}

	if (unit) {
		return String(number).concat(unit);
	}

	return number;
}

const customProperties = `--scale-ratio: ${ratio};`;

export { name, customProperties };

// js helpers
export default { get };
