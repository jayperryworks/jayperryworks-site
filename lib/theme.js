import { oklch, formatCss } from 'culori';
import { convertHexToHSLObject, convertHSLObjectToHSL } from '@lib/colorHelpers';
import './types.ts';

/**
 * @typedef {
* 	name: ThemeNames,
* 	hue: number,
* 	<string>: Record<ColorRoles, HexColor | OKLCHColor | CSSVariable>,
* } Theme
* @description A Theme object contains either:
*		- the name of a default theme (e.g. name: 'cherry'),
*		- a hue to build a theme from (e.g. hue: 0),
*		- or a set of colors assigned to color role tokens (e.g. highlight: #fff)
*/

// A set of default hues for color themes used throughout the site
const hues = {
	cherry: 7,
	mustard: 12,
	mint: 18,
	lavendar: 23,
	anemone: 33,
};

// build a theme for this page based on the data from Prismic
// TODO: cover to JS function using standard Theme object
// Get hue from CMS hex surface value and use that to derive other roles as needed
// Return object of role tokens with oklch values
// { surface: #fff } => { primary: oklch(xdeg x x), ... }
/**
 * Build a color theme based on custom color roles
 *
 * @param {Theme} theme
 * @returns {Partial<ThemeData>}
 */
function generateCustomTheme(theme) {

	// if these colors aren't specified in the Prismic data, derive each from the surface color
	const themeFallbackLs = {
		primary: 25,
		secondary: 35,
		border: (generatedTheme?.surface?.l - 15) || 40,
		shadow: (generatedTheme?.surface?.l - 10) || 10,
		well: (generatedTheme?.surface?.l - 5) || 60,
		island: (generatedTheme?.surface?.l + 5) || 70,
	};

	if (theme?.surface) {
		// convert the theme values to objects
		let generatedTheme = Object.keys(theme).reduce((result, role) => {
			if (theme[role]) {
				result[role] = convertHexToHSLObject(theme[role]);
			}
			return result;
		}, {});

		Object.keys(themeFallbackLs).forEach((role) => {
			if (!generatedTheme[role]) {
				generatedTheme[role] = {
					...generatedTheme.surface,
					l: themeFallbackLs[role],
				}
			}
		});

		return Object.keys(generatedTheme).reduce((result, role) => {
			result[role] = convertHSLObjectToHSL(generatedTheme[role]);
			return result;
		}, {});
	}

	return {};
}

/**
 * Transform a Theme object into a set of CSS variables
 * to create a custom color theme
 * @param {Theme} theme - theme object
 * @returns {string} - a set of CSS variables that can be added to a style attr
 */
export default function setThemeStyle(theme) {
	if (theme) {
		// if a theme name is included, assign a default hue to the key-h variable
		if (theme.name) return `--key-h: ${hues[theme.name]}deg`;
		// if a hue is included, assign it to the key-h variable
		if (theme.hue) return `--key-h: ${theme.hue}deg`;

		// if custom color roles are included, assign role variables for each
		// - that match the tokens in src/styles/tokens/color.css
		return Object.keys(theme).reduce((result, role) => {
			if (theme[role]) result.push(`--color-${role}: ${theme[role]}`);
			return result;
		}, []).join(' ');
	}

	// if all else fails, return an empty string
	return '';
}
