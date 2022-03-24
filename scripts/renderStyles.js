// Generate global CSS from design tokens
// -> based heavily on Andy Picaccalilli's ideas in Gorko and Goron
// Gorko: https://github.com/andy-piccalilli/gorko
// Goron: https://github.com/hankchizljaw/goron

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import * as modules from '../src/lib/styleGenerators/index.js';

// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = '../src/styles';

function render (type, styles) {
	if (Array.isArray(styles[type])) return styles[type].join('');

	return styles[type];
}

function renderAll (type) {
	return Object.values(modules).reduce((result, styles) => {
		if (styles[type]) {
			result.push(`
				/* --- ${styles.name} --- */

				${render(type, styles)}
			`);
		}
		return result;
	}, []).join('\n');
}

// base styles
if (!fs.existsSync(path.join(__dirname, outputPath))) {
	fs.mkdirSync(path.join(__dirname, outputPath));
}

fs.writeFileSync(
	path.join(__dirname, `${outputPath}/base.css`),
	`
		/* --- Global custom properties --- */
		:root {

			${renderAll('customProperties')}
		}

		/* --- Base styles --- */
		${renderAll('base')}
	`
);

// utilities
if (!fs.existsSync(path.join(__dirname, `${outputPath}/utilities`))) {
	fs.mkdirSync(path.join(__dirname, `${outputPath}/utilities`));
}

Object.keys(modules).forEach((name) => {
	if (modules[name].utilities) {
		fs.writeFileSync(
			path.join(__dirname, `${outputPath}/utilities/${name}.css`),
			render('utilities', modules[name])
		);
	}
});
