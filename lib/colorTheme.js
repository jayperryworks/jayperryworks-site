import { oklch, formatCss } from 'culori';

// some brand colors (hues) that define preset themes
export const presetHues = {
	cherry: 7,
	mustard: 102,
	mint: 158,
	lavendar: 263,
	anemone: 303,
};

// use this wherever a theme isn't defined
export const DEFAULT_HUE = presetHues.lavendar;

/**
 * Render a CSS variable for a given base hue value (OKLCH)
 * @param {number | string} value - an OKLCH hue value, between 0 and 360
 * @returns {string}
 */
export function setBaseHue(value) {
	return `--base-h: ${value}deg;`;
}

/**
 *
 * @param {string} hex - hex code for a color
 * @returns {string} - CSS color, `oklch(0% 0 0deg)`
 */
export function hexToOKLCH(hex) {
	return formatCss({
		mode: 'oklch',
		...oklch(hex),
	});
}

/**
 * Create CSS variables from the name, hue, and/or custom props
 *
 * @param {object} [theme] - theme data
 * @param {boolean} [inherit=false] - should the theme inherit the parent theme?
 * @returns {string[]} - an array of css variable definitions, e.g. --base-h: 100deg;
 */
export function setThemeStyle(options = {}) {
	const {
		name,
		hue,
		custom,
		inherit = false,
	} = options;
	let styles = [];

	// if a theme name is passed as a prop, assign a default hue to the base-h variable
	if (name) styles.push(setBaseHue(presetHues[name.toLowerCase()]));

	// if a custom hue is passed as a prop, assign it to the base-h variable
	if (hue) styles.push(setBaseHue(hue));

	if (custom?.length > 0) {
		// if custom color roles are passed as a prop, assign role variables for each
		// that match the tokens in the local styles below
		for (const item of custom) {
			const { primary: theme } = item;
			// Default to "Light" - the CMS may pass null if the field hasn't been modified
			let mode = theme?.mode || 'light';
			// If there's only one item in the custom theme object,
			// the mode is always 'light', because it must be used all the time
			if (custom.length === 1) mode = 'light';

			for (const role in theme) {
				// if the role value isn't undefined/false
				if (theme[role] && role !== 'mode') {
					// clean up the field name (messy Prismic data) so it matches a color token
					// - stopgap - hopefully won't need this with the new CMS
					const name = role
						.replaceAll('theme_', '')
						.replaceAll('_foreground', '')
						.replaceAll('_color', '');

					const formattedColor = hexToOKLCH(theme[role]);

					styles.push(
						`--custom-${mode.toLowerCase()}-${name}: ${formattedColor};`
					);
				}
			}
		}
	}

	// if all else fails (no props have been passed in), use the default base hue
	if (styles.length === 0 && !inherit) styles.push(setBaseHue(DEFAULT_HUE));
	return styles.join('');
}
