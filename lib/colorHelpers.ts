// utilities
import convertColor from 'color-convert';

// types
import {
	CSSVariable,
	HexColor,
	HSLColor,
} from './types.ts';

export function convertHexToHSL(hex: HexColor): HSLColor {
	// convert the color from a hex to an array of hsl values...
	const hsl = convertColor.hex.hsl(hex);

	// ...and then to CSS (string), with or without alpha channel
	if (hsl.length > 3) {
		return `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}% / ${hsl[3]})`;
	}

	return `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`;
}

type HSLChannel = 'h' | 's' | 'l' | 'a' | 'all';

export function getColorToken(role: string, channel: HSLChannel = 'all'): CSSVariable {
	if (channel !== 'all') return `var(--color-${role}-${channel})`;
	return `var(--color-${role});`;
}
