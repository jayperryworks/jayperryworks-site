// utilities
import convertColor from 'color-convert';

// types
import { HexColor, CSSVariable, HSLColor } from './types.ts';

type HSLColorData = {
	h: number,
	s: number,
	l: number,
};

export function convertHexToHSL(hex: HexColor): HSLColor {
	// convert the color from a hex to hsl (array)...
	const hsl = convertColor.hex.hsl(hex);

	// ...and then to an object, so we can use each for CSS variables
	// -> e.g. --color-highlight-h
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
