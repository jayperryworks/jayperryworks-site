// utilities
import convertColor from 'better-color-tools';

// types
import {
	CSSVariable,
	HexColor,
	HSLColor,
	HSLChannel,
	HSLObject,
	HSLAColor,
} from './types.ts';

export function convertHexToHSL(hex: HexColor): HSLColor | HSLAColor {
	// convert the color from a hex to an array of hsl values...
	const hsl = convertColor.hex.hsl(hex);

	// ...and then to CSS (string), with or without alpha channel
	if (hsl.length > 3) {
		return `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}% / ${hsl[3]})`;
	}

	return `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`;
}

export function convertHexToHSLObject(hex: HexColor): Partial<HSLObject> {
	// convert the color from a hex to hsl (array)...
	const hsl = convertColor.hex.hsl(hex);

	// ...and then to an object, so we can use each for CSS variables
	// -> e.g. --color-highlight-h
	return hsl.reduce((result, value, index) => {
		const key = Object.keys(result)[index];
		/* eslint-disable no-param-reassign */
		// -> need to reassign to the param because the result is an object
		result[key] = value;
		/* eslint-enable no-param-reassign */
		return result;
	}, { h: null, s: null, l: null });
}

export function convertHSLObjectToHSL(object: HSLObject): HSLColor | HSLAColor {
	if (object?.a < 1) return `hsl(${object.h}deg ${object.s}% ${object.l}% / ${object.a})`;
	return `hsl(${object.h}deg ${object.s}% ${object.l}%)`;
}

export function getColorToken(role: string, channel: HSLChannel | 'all' = 'all'): CSSVariable {
	if (channel !== 'all') return `var(--color-${role}-${channel})`;
	return `var(--color-${role});`;
}
