// Generate global CSS from design tokens
// -> based heavily on Andy Picaccalilli's ideas in Gorko and Goron
// Gorko: https://github.com/andy-piccalilli/gorko
// Goron: https://github.com/hankchizljaw/goron
import fs from 'fs';
import path from 'path';
import * as modules from '../src/lib/styleGenerators/index.js';

function render (type) {
	return Object.values(modules).map((styles) => {
		if (styles[type]) {
			return `
				/* --- ${styles.name} --- */
				${Array.isArray(styles[type]) ? styles[type].join('') : styles[type]}
			`
		}
	}).join('\n')
}

const outputPath = '../../static/stylesheets';

if (!fs.existsSync(path.join(__dirname, outputPath))) {
	fs.mkdirSync(path.join(__dirname, outputPath))
}

// create base styles
fs.writeFileSync(
	path.join(__dirname, `${outputPath}/base.css`),
	`
		/* --- Global custom properties --- */
		:root {
			${render('customProperties')}
		}

		/* --- Base styles --- */
		${render('base')}

		/* --- Utility classes --- */
		${render('utilities')}
	`
)

// create utilities
Object.keys(modules).forEach((name) => {
	fs.writeFileSync(
		path.join(__dirname, `${outputPath}/utilities/${name}.css`),
		render(name)
	);
});
